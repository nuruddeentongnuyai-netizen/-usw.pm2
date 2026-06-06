import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Square, RotateCcw, AlertTriangle, ShieldCheck, Thermometer, Droplet, Wind, Activity, 
  Trash2, Plus, Download, Printer, CircleCheck, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { WaterState, WaterPreset, LogEntry, ThresholdConfig } from '../types';

const WATER_PRESETS: WaterPreset[] = [
  {
    id: 'household',
    name: 'น้ำเสียจากครัวเรือน (Graywater)',
    pH: 5.6,
    turbidity: 155.0,
    temperature: 25.5,
    odorIndex: 75,
    icon: '🏡',
    description: 'น้ำเสียหยาบจากการซักล้าง ล้างจาน และอาบน้ำในชีวิตประจำวัน'
  },
  {
    id: 'restaurant',
    name: 'น้ำทิ้งร้านอาหารปนเปื้อนไขมัน',
    pH: 4.2,
    turbidity: 480.0,
    temperature: 34.2,
    odorIndex: 98,
    icon: '🍳',
    description: 'เศษอาหารปนเปื้อนและน้ำล้างเครื่องปรุงรสเข้มข้น ความเป็นกรดและคราบมันสูง'
  },
  {
    id: 'school_pond',
    name: 'น้ำขังเน่าเสียในบ่อโรงเรียน',
    pH: 6.3,
    turbidity: 85.0,
    temperature: 26.8,
    odorIndex: 45,
    icon: '🏫',
    description: 'น้ำกักขังระบายไม่สะดวก สกปรก ตะไคร่น้ำ บ่มเพาะจุลินทรีย์มีกลิ่นอับชื้น'
  },
  {
    id: 'agriculture',
    name: 'น้ำระบายจากแปลงเกษตรกรรม',
    pH: 5.0,
    turbidity: 210.0,
    temperature: 24.0,
    odorIndex: 30,
    icon: '🌱',
    description: 'น้ำชะล้างดินตะกอนหยาบ ผสมปุ๋ยเคมีไนโตรเจนและยาฆ่าแมลงตกค้าง'
  },
  {
    id: 'canal',
    name: 'น้ำคลองระบายน้ำเน่าใจกลางเมือง',
    pH: 5.9,
    turbidity: 360.0,
    temperature: 28.5,
    odorIndex: 90,
    icon: '🛶',
    description: 'น้ำเสียสีคล้ำจากท่อระบายร่วมชุมชน มีขยะเบาและตะกอนอินทรีย์หนาแน่น'
  }
];

const DEFAULT_THRESHOLDS: ThresholdConfig = {
  minPh: 6.5,
  maxPh: 8.5,
  maxTurbidity: 20.0,
  maxOdor: 15
};

interface WastewaterSimulatorProps {
  onAddAlert: (title: string, message: string, severity: 'warn' | 'critical') => void;
}

export default function WastewaterSimulator({ onAddAlert }: WastewaterSimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState<WaterPreset>(WATER_PRESETS[0]);
  
  // Simulation water parameters (Live values)
  const [currentParams, setCurrentParams] = useState<WaterState>({
    pH: WATER_PRESETS[0].pH,
    turbidity: WATER_PRESETS[0].turbidity,
    temperature: WATER_PRESETS[0].temperature,
    odorIndex: WATER_PRESETS[0].odorIndex,
    treatedPh: WATER_PRESETS[0].pH,
    treatedTurbidity: WATER_PRESETS[0].turbidity,
    treatedOdorIndex: WATER_PRESETS[0].odorIndex,
    status: 'idle',
    progress: 0
  });

  const [thresholds, setThresholds] = useState<ThresholdConfig>(DEFAULT_THRESHOLDS);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: new Date().toLocaleTimeString('th-TH'),
      message: 'ระบบ Smart Water Treatment พร้อมใช้งาน รอระบุชุดน้ำเสียเพื่อเริ่มกระบวนการ...',
      type: 'info'
    }
  ]);

  // Saved treatment history for interactive graphing
  const [treatmentHistory, setTreatmentHistory] = useState<Array<{
    id: string;
    sourceName: string;
    timestamp: string;
    beforeTurbidity: number;
    afterTurbidity: number;
    beforePh: number;
    afterPh: number;
    beforeOdor: number;
    afterOdor: number;
  }>>([
    {
      id: 'h1',
      sourceName: 'น้ำเสียจากครัวเรือน (Graywater)',
      timestamp: '10:30:15',
      beforeTurbidity: 155.0,
      afterTurbidity: 3.2,
      beforePh: 5.6,
      afterPh: 7.2,
      beforeOdor: 75,
      afterOdor: 0
    },
    {
      id: 'h2',
      sourceName: 'น้ำทิ้งร้านอาหารปนเปื้อนไขมัน',
      timestamp: '11:15:22',
      beforeTurbidity: 480.0,
      afterTurbidity: 4.8,
      beforePh: 4.2,
      afterPh: 7.4,
      beforeOdor: 98,
      afterOdor: 1
    }
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const simTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pausedStageRef = useRef<WaterState['status']>('pumping');

  // Sync parameters on source preset change
  useEffect(() => {
    if (currentParams.status === 'idle') {
      setCurrentParams({
        pH: selectedPreset.pH,
        turbidity: selectedPreset.turbidity,
        temperature: selectedPreset.temperature,
        odorIndex: selectedPreset.odorIndex,
        treatedPh: selectedPreset.pH,
        treatedTurbidity: selectedPreset.turbidity,
        treatedOdorIndex: selectedPreset.odorIndex,
        status: 'idle',
        progress: 0
      });
      addLog(`สลับแหล่งกำจัดโมเดลตรวจจับเป็น: ${selectedPreset.name}`, 'info');
    }
  }, [selectedPreset]);

  // Clean timeouts on unmount
  useEffect(() => {
    return () => {
      if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current);
    };
  }, []);

  const addLog = (message: string, type: 'info' | 'warn' | 'success') => {
    const timestamp = new Date().toLocaleTimeString('th-TH');
    setLogs(prev => [{ timestamp, message, type }, ...prev]);
  };

  const handleReset = () => {
    if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current);
    setIsPlaying(false);
    setCurrentParams({
      pH: selectedPreset.pH,
      turbidity: selectedPreset.turbidity,
      temperature: selectedPreset.temperature,
      odorIndex: selectedPreset.odorIndex,
      treatedPh: selectedPreset.pH,
      treatedTurbidity: selectedPreset.turbidity,
      treatedOdorIndex: selectedPreset.odorIndex,
      status: 'idle',
      progress: 0
    });
    addLog('รีเซ็ตสถานะระบบกลับไปเริ่มทำความสะอาดใหม่', 'info');
  };

  // Run the multi-stage treatment loop simulation
  const startTreatmentProcess = (resume: boolean = false) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    let stage: WaterState['status'] = 'pumping';
    let prog = 0;
    
    // Initial parameter copies
    let tempPh = selectedPreset.pH;
    let tempTurb = selectedPreset.turbidity;
    let tempOdor = selectedPreset.odorIndex;

    if (resume) {
      stage = pausedStageRef.current;
      prog = currentParams.progress;
      tempPh = currentParams.treatedPh;
      tempTurb = currentParams.treatedTurbidity;
      tempOdor = currentParams.treatedOdorIndex;
      addLog(`⏸️ [ทำงานต่อ] ดำเนินการบำบัดน้ำเสียต่อจากขั้นตอนเดิม (${prog}%)`, 'info');
    } else {
      addLog(`[เริ่มกระบวนการบำบัด] สูบน้ำดิบเข้าถังปฐมภูมิ: ${selectedPreset.name}`, 'info');
    }

    const intervalTime = 120; // total duration ~10-12 seconds
    
    const runTick = () => {
      prog += 1.5;
      if (prog >= 100) {
        prog = 100;
        stage = 'completed';
        
        // Final targets
        const finalPh = 7.2;
        const finalTurb = Number((1.5 + Math.random() * 3).toFixed(1));
        const finalOdor = Math.random() > 0.7 ? 1 : 0;

        setCurrentParams({
          pH: selectedPreset.pH,
          turbidity: selectedPreset.turbidity,
          temperature: selectedPreset.temperature,
          odorIndex: selectedPreset.odorIndex,
          treatedPh: finalPh,
          treatedTurbidity: finalTurb,
          treatedOdorIndex: finalOdor,
          status: 'completed',
          progress: 100
        });

        setIsPlaying(false);
        addLog('🎉 [บำบัดสมบูรณ์] คุณภาพผ่านเกณฑ์มาตรฐานกระทรวงสิ่งแวดล้อมเสร็จสิ้น!', 'success');
        
        // Save to statistics history
        const newHistoryId = 'h-' + Date.now();
        setTreatmentHistory(prev => [
          {
            id: newHistoryId,
            sourceName: selectedPreset.name,
            timestamp: new Date().toLocaleTimeString('th-TH'),
            beforeTurbidity: selectedPreset.turbidity,
            afterTurbidity: finalTurb,
            beforePh: selectedPreset.pH,
            afterPh: finalPh,
            beforeOdor: selectedPreset.odorIndex,
            afterOdor: finalOdor
          },
          ...prev
        ]);

        return;
      }

      // Progression thresholds
      if (prog > 0 && prog <= 20) {
        stage = 'pumping';
        // Minor dust sediment falling off
        tempTurb = Math.max(selectedPreset.turbidity - 10, selectedPreset.turbidity * 0.95);
      } else if (prog > 20 && prog <= 55) {
        if (stage !== 'filtering') {
          stage = 'filtering';
          addLog('⚡ [ตัวกรองกายภาพ] คาร์บอนกัมมันต์กรองสิ่งสกปรกและลดกลิ่นอับชื้น...', 'info');
        }
        // Rapid dust drop, odor drops
        tempTurb = Math.max(15, tempTurb - (selectedPreset.turbidity / 12));
        tempOdor = Math.max(10, tempOdor - (selectedPreset.odorIndex / 15));
      } else if (prog > 55 && prog <= 75) {
        if (stage !== 'neutralizing') {
          stage = 'neutralizing';
          addLog('⚖️ [ระบบควบคุมเกณฑ์เคมี] ปล่อยฟู้ดเกรดเบสเจือจางปรับค่า pH ให้เป็นกลาง...', 'info');
        }
        // Move pH towards neutral (7.2)
        const diff = 7.2 - tempPh;
        tempPh += diff * 0.15;
        // Minor remaining turbidity clearance
        tempTurb = Math.max(8, tempTurb - 1.5);
        tempOdor = Math.max(3, tempOdor - 2);
      } else if (prog > 75 && prog < 100) {
        if (stage !== 'uv_sterilizing') {
          stage = 'uv_sterilizing';
          addLog('🔮 [รังสี UV-C] ฉายแสงฆ่าแบคทีเรียและสปอร์โรคปนเปื้อนชนิดสุดท้าย...', 'success');
        }
        // Move towards perfect states
        const diff = 7.2 - tempPh;
        tempPh += diff * 0.25;
        tempTurb = Math.max(3.2, tempTurb - 0.8);
        tempOdor = Math.max(1, tempOdor - 1);
      }

      // Set state values during transition
      setCurrentParams({
        pH: selectedPreset.pH,
        turbidity: selectedPreset.turbidity,
        temperature: selectedPreset.temperature,
        odorIndex: selectedPreset.odorIndex,
        treatedPh: Number(tempPh.toFixed(2)),
        treatedTurbidity: Number(tempTurb.toFixed(1)),
        treatedOdorIndex: Math.round(tempOdor),
        status: stage,
        progress: Math.round(prog)
      });

      simTimeoutRef.current = setTimeout(runTick, intervalTime);
    };

    runTick();
  };

  const handlePause = () => {
    if (simTimeoutRef.current) {
      clearTimeout(simTimeoutRef.current);
      simTimeoutRef.current = null;
    }
    setIsPlaying(false);
    pausedStageRef.current = currentParams.status === 'paused' ? 'pumping' : currentParams.status;
    setCurrentParams(prev => ({
      ...prev,
      status: 'paused'
    }));
    addLog(`⏸️ [หยุดกระบวนการชั่วคราว] ระบบปรับไปโหมดพักทำงานชั่วคราวที่ (${currentParams.progress}%)`, 'warn');
  };

  const handleStop = () => {
    if (simTimeoutRef.current) {
      clearTimeout(simTimeoutRef.current);
      simTimeoutRef.current = null;
    }
    setIsPlaying(false);
    setCurrentParams({
      pH: selectedPreset.pH,
      turbidity: selectedPreset.turbidity,
      temperature: selectedPreset.temperature,
      odorIndex: selectedPreset.odorIndex,
      treatedPh: selectedPreset.pH,
      treatedTurbidity: selectedPreset.turbidity,
      treatedOdorIndex: selectedPreset.odorIndex,
      status: 'idle',
      progress: 0
    });
    addLog('🛑 [ปิดเครื่อง / หยุดทำงาน] สั่งปิดเครื่องกรองฉุกเฉินและเคลียร์ระดับน้ำคราบสะสม', 'warn');
  };

  const clearHistory = () => {
    setTreatmentHistory([]);
    addLog('ล้างประวัติบันทึกข้อมูลการทดสอบ', 'warn');
  };

  // Check state warnings for sensor panels
  const isPhAlarm = currentParams.status === 'completed' 
    ? (currentParams.treatedPh < thresholds.minPh || currentParams.treatedPh > thresholds.maxPh)
    : (currentParams.pH < thresholds.minPh || currentParams.pH > thresholds.maxPh);

  const isTurbidityAlarm = currentParams.status === 'completed'
    ? currentParams.treatedTurbidity > thresholds.maxTurbidity
    : currentParams.turbidity > thresholds.maxTurbidity;

  const isOdorAlarm = currentParams.status === 'completed'
    ? currentParams.treatedOdorIndex > thresholds.maxOdor
    : currentParams.odorIndex > thresholds.maxOdor;

  // Print Report Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-brand-text pb-4">
        <div>
          <span className="text-[10px] tracking-widest font-bold font-mono text-emerald-800 uppercase block">INTERACTIVE PLATFORM</span>
          <h2 className="text-2xl font-serif font-black tracking-tight text-[#1A1A1A] flex items-center gap-2 mt-0.5">
            Smart Water Monitor Dashboard
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            ระบบจำลองเครื่องตรวจสอบคุณภาพน้ำและถังวิเคราะห์ฟิสิกส์-เคมี ยูนิตประมวลผล IoT
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Main RESET or POWER OFF Button */}
          {(currentParams.status === 'idle' || currentParams.status === 'completed') ? (
            <button 
              onClick={handleReset}
              disabled={isPlaying}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-slate-700 bg-white hover:bg-slate-100 font-mono font-bold border border-slate-300 rounded text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตแกนกรอง
            </button>
          ) : (
            <button 
              onClick={handleStop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-red-750 bg-red-50 hover:bg-red-100 border border-red-250 font-mono font-bold rounded text-xs transition-colors cursor-pointer"
              title="สั่งหยุดและปิดการทำงานทันที"
            >
              <Square className="w-3.5 h-3.5 fill-current text-red-500" />
              <span>ปิดเครื่องบำบัด (Stop / Off)</span>
            </button>
          )}

          {/* DYNAMIC PROCESS CONTROL BUTTON (PLAY / PAUSE / RESUME) */}
          {currentParams.status === 'paused' ? (
            <button
              onClick={() => startTreatmentProcess(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 font-serif italic transition-all font-bold rounded text-xs cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>ทำงานต่อ (Resume)</span>
            </button>
          ) : (currentParams.status === 'idle' || currentParams.status === 'completed') ? (
            <button
              onClick={() => startTreatmentProcess(false)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-brand-text text-white hover:bg-slate-800 font-serif italic transition-all font-bold rounded text-xs cursor-pointer shadow-sm disabled:bg-slate-330"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{currentParams.status === 'completed' ? 'เริ่มบำบัดใหม่อีกครั้ง' : 'เริ่มกระบวนการบำบัด (Start)'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 text-white hover:bg-amber-600 font-serif italic transition-all font-bold rounded text-xs cursor-pointer shadow-sm"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>หยุดชั่วคราว (Pause)</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Preset Select & Water treatment Animation Tank */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Select Card */}
          <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-sm">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
              1. เลือกแหล่งกำเนิดน้ำเสียที่ต้องการทดสอบ
            </h3>
            <div className="grid grid-cols-1 gap-2.5 max-h-[220px] overflow-y-auto pr-2">
              {WATER_PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      if (currentParams.status === 'idle' || currentParams.status === 'completed') setSelectedPreset(preset);
                    }}
                    disabled={currentParams.status !== 'idle' && currentParams.status !== 'completed'}
                    className={`p-3.5 rounded border text-left transition-all flex items-start gap-4 relative overflow-hidden ${
                      isSelected 
                        ? 'border-brand-text bg-emerald-50/20 text-slate-900' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    } ${currentParams.status !== 'idle' && currentParams.status !== 'completed' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="text-2xl mt-0.5">{preset.icon}</span>
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>{preset.name}</span>
                        {isSelected && <span className="text-[9px] bg-brand-text text-white px-2 py-0.5 rounded font-mono font-bold tracking-wider">SELECTED</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">{preset.description}</p>
                      
                      {/* Technical metadata snippet */}
                      <div className="flex gap-4 text-[10px] text-slate-400 font-mono pt-1">
                        <span>pH: <strong className="text-slate-600">{preset.pH}</strong></span>
                        <span>ความขุ่น: <strong className="text-slate-600">{preset.turbidity} NTU</strong></span>
                        <span>กลิ่น: <strong className="text-slate-600">{preset.odorIndex}%</strong></span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graphic Treatment Tank Animation */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 font-sans flex items-center gap-1.5">
                <span>2. แอนิเมชันห้องกรองเครื่องบำบัด (Physical Filter Assembly)</span>
              </h3>
              <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full ${
                currentParams.status === 'idle' ? 'bg-slate-100 text-slate-500' :
                currentParams.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                currentParams.status === 'paused' ? 'bg-amber-100 text-amber-850 border border-amber-300' :
                'bg-blue-100 text-blue-700 animate-pulse border border-blue-200'
              }`}>
                {currentParams.status === 'idle' ? 'รอเดินระบบ' :
                 currentParams.status === 'pumping' ? 'สูบน้ำดิบเข้าถังกรอง (Sedimentation)...' :
                 currentParams.status === 'filtering' ? 'กำลังกรองทรายละเอียดและ Activated Carbon...' :
                 currentParams.status === 'neutralizing' ? 'กำลังปรับค่า pH (Neutralizer)...' :
                 currentParams.status === 'uv_sterilizing' ? 'ฆ่าเชื้อความร้อนรังสี UV-C...' :
                 currentParams.status === 'paused' ? '⏸️ ระบบหยุดทำงานชั่วคราว (Paused)' :
                 'บำบัดสมบูรณ์ (Safe Clean Water)'}
              </span>
            </div>

            {/* Container and Pipes Drawing */}
            <div className="h-56 bg-gradient-to-b from-slate-900/5 to-slate-900/10 border border-slate-100 rounded-xl relative overflow-hidden flex flex-col justify-between p-4">
              
              {/* Dynamic light rays or status backdrops */}
              {currentParams.status === 'uv_sterilizing' && (
                <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none animate-pulse"></div>
              )}

              {/* Progress bar overlay */}
              {isPlaying && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200/40">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-150"
                    style={{ width: `${currentParams.progress}%` }}
                  ></div>
                </div>
              )}

              {/* Wastewater Tank & Clean water pipe schematic */}
              <div className="grid grid-cols-3 gap-3 h-full items-center relative z-10 text-center">
                
                {/* 1st chamber: Intake Sedimentation */}
                <div className="bg-slate-900/10 border border-slate-300/40 rounded-lg p-2.5 h-full flex flex-col justify-between relative overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">Chamber A: Sediment</span>
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Water Level Liquid graphic */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-300 ${
                        currentParams.status === 'idle' ? 'h-[70%] bg-amber-800/25' :
                        currentParams.status === 'pumping' ? 'animate-bounce h-[80%] bg-amber-850/50' :
                        currentParams.status === 'paused' ? 'h-[40%] bg-amber-800/35 border-t border-dashed border-amber-600/50' :
                        'h-[20%] bg-slate-400/20'
                      }`}
                    ></div>
                    <span className="text-xl relative z-10">🌪️</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">ดักกรองหยาบ</span>
                </div>

                {/* 2nd chamber: Active Carbon & Biochar */}
                <div className="bg-slate-900/10 border border-slate-300/40 rounded-lg p-2.5 h-full flex flex-col justify-between relative overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">Chamber B: Carbon</span>
                  <div className="flex-1 flex items-center justify-center relative">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-300 ${
                        currentParams.status === 'idle' ? 'h-0' :
                        currentParams.status === 'pumping' ? 'h-[40%] bg-amber-800/40' :
                        currentParams.status === 'filtering' ? 'h-[75%] bg-blue-400/30' :
                        currentParams.status === 'paused' ? 'h-[50%] bg-amber-900/30 border-t border-dashed border-amber-850/40' :
                        'h-[40%] bg-emerald-500/20'
                      }`}
                    ></div>
                    {/* Particle dust filtering dots */}
                    <div className="absolute top-1/2 left-1/4 space-y-1 z-10 text-xl">
                      {currentParams.status === 'filtering' ? '⏳' : currentParams.status === 'paused' ? '⏸️' : '🖤'}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">ลดสี-ดูดซับกลิ่น</span>
                </div>

                {/* 3rd chamber: Neutralization / UV Chamber */}
                <div className="bg-slate-900/10 border border-slate-300/40 rounded-lg p-2.5 h-full flex flex-col justify-between relative overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">Chamber C: UV / Out</span>
                  <div className="flex-1 flex items-center justify-center relative">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-300 ${
                        currentParams.status === 'completed' ? 'h-[70%] bg-cyan-400/30' :
                        currentParams.status === 'uv_sterilizing' ? 'h-[70%] bg-indigo-500/40' :
                        currentParams.status === 'neutralizing' ? 'h-[50%] bg-blue-300/30' :
                        currentParams.status === 'paused' ? 'h-[35%] bg-blue-400/20' :
                        'h-0'
                      }`}
                    ></div>
                    
                    {/* Glowing effect inside UV tube */}
                    {currentParams.status === 'uv_sterilizing' && (
                      <div className="absolute w-8 h-8 bg-indigo-500 rounded-full blur-sm opacity-60 animate-ping"></div>
                    )}
                    <span className="text-xl relative z-10">
                      {currentParams.status === 'completed' ? '💧' :
                       currentParams.status === 'uv_sterilizing' ? '🔮' :
                       currentParams.status === 'neutralizing' ? '⚖️' : '🌿'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">ปรับ pH - ฆ่าเชื้อ UV</span>
                </div>

              </div>

              {/* Water connection pipe drawings */}
              <div className="absolute top-[48%] left-[28%] w-[12%] h-2.5 bg-slate-300/80 rounded-full">
                {isPlaying && currentParams.progress > 15 && (
                  <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                )}
              </div>
              <div className="absolute top-[48%] left-[61%] w-[12%] h-2.5 bg-slate-300/80 rounded-full">
                {isPlaying && currentParams.progress > 50 && (
                  <div className="h-full bg-teal-400 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                )}
              </div>
            </div>

            {/* Stage text cards */}
            <div className="text-xs text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> ข้อมูลพรีเซ็ตน้ำเสียขาเข้า (Input)
                </span>
                <p className="text-[11px] leading-snug">
                  ท่อระบายน้ำนำมลพิษเข้าเซ็นเซอร์: <strong className="text-amber-850 font-bold">{selectedPreset.name}</strong> ตรวจพบความขุ่นดิบสูงถึง <strong className="font-mono text-amber-700">{selectedPreset.turbidity} NTU</strong> และกลิ่นแอมโมเนียตกค้างหนาหู
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5 text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> อัตราผลิตน้ำบริสุทธิ์คืนธรรมชาติ (Output)
                </span>
                <p className="text-[11px] leading-snug">
                  ผลรวมความทุ่มเททางวิชาการ: ค่าความขุ่นปลายท่อลดฮวบเหลือเพียง <strong className="font-mono text-emerald-600 font-bold">{currentParams.status === 'completed' ? currentParams.treatedTurbidity : '--'} NTU</strong> ปรับระบบจุลินทรีย์เสถียร สะอาดพร้อมปล่อยสุขลักษณะที่ดี
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column - Live Telemetry Tele-sensors & Logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Realtime Sensors Measurements Panels */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 font-sans">
              3. แผงวัดค่าข้อมูลทางวิทยาศาสตร์ (Telemetry Board)
            </h3>
            
            <div className="space-y-3.5">
              
              {/* Sensor Card: pH */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                isPhAlarm ? 'bg-red-50/70 border-red-200' : 'bg-slate-50/70 border-slate-100'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg text-xs ${isPhAlarm ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    ⚖️
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">ค่าความเป็นกรด-ด่าง (pH Level)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">เกณฑ์มาตรฐาน: {thresholds.minPh} - {thresholds.maxPh} pH</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold font-mono ${isPhAlarm ? 'text-red-650' : 'text-emerald-750'}`}>
                    {currentParams.status === 'completed' ? currentParams.treatedPh.toFixed(1) : currentParams.pH.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {isPhAlarm ? '⚠️ มลพิษกรด-ด่าง' : '✅ มาตรฐานปลอดภัย'}
                  </span>
                </div>
              </div>

              {/* Sensor Card: Turbidity */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                isTurbidityAlarm ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50/70 border-slate-100'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg text-xs ${isTurbidityAlarm ? 'bg-amber-100 text-amber-700 font-bold' : 'bg-teal-100 text-teal-700'}`}>
                    <Droplet className="w-4 h-4 text-teal-650" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">ปริมาณคราบเศษฝุ่น/ความขุ่น (Turbidity)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">เกณฑ์จำกัดสูงสุด: &lt; {thresholds.maxTurbidity} NTU</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold font-mono ${isTurbidityAlarm ? 'text-amber-650' : 'text-emerald-750'}`}>
                    {currentParams.status === 'completed' ? currentParams.treatedTurbidity.toFixed(1) : currentParams.turbidity.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-sans block text-slate-500">NTU</span>
                </div>
              </div>

              {/* Sensor Card: Odor index */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                isOdorAlarm ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-orange-100 text-orange-700 text-xs text-orange-500 font-bold">
                    <Wind className="w-4 h-4 text-orange-650" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">ดัชนีกลิ่นเหม็นรบกวน (Odor Index)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">เป้าหมายประสิทธิภาพ: &lt; {thresholds.maxOdor}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold font-mono ${isOdorAlarm ? 'text-red-650' : 'text-emerald-750'}`}>
                    {currentParams.status === 'completed' ? currentParams.treatedOdorIndex : currentParams.odorIndex}
                  </span>
                  <span className="text-[10px] font-sans block text-slate-500">%</span>
                </div>
              </div>

              {/* Sensor Card: Temperature */}
              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-blue-50 text-blue-750 text-xs">
                    <Thermometer className="w-4 h-4 text-blue-650" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">อุณหภูมิน้ำบำบัดเสีย (Temperature)</span>
                    <span className="text-[10px] text-slate-400 block font-mono">ช่วงวัดอุณหภูมิแวดล้อมสัจธรรม</span>
                  </div>
                </div>
                <div className="text-right font-mono text-slate-700">
                  <span className="text-xl font-bold">{currentParams.temperature.toFixed(1)}</span>
                  <span className="text-xs ml-0.5 font-sans">°C</span>
                </div>
              </div>

            </div>
          </div>

          {/* Logs Board Diagnostics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-sm font-mono text-[11px] leading-relaxed relative">
            <h4 className="text-[12px] font-bold text-teal-400 pb-2 mb-2 border-b border-white/10 font-sans flex items-center justify-between">
              <span>🖨️ บันทึกระบบกรองน้ำ (Console Diagnostics)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse"></span>
            </h4>
            
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
              {logs.map((log, i) => (
                <div key={i} className={`flex items-start gap-1.5 ${
                  log.type === 'success' ? 'text-emerald-300' :
                  log.type === 'warn' ? 'text-amber-300' :
                  'text-slate-300'
                }`}>
                  <span className="text-[10px] text-slate-500">[{log.timestamp}]</span>
                  <span className="flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Historical statistics section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 font-sans">
              4. กราฟเปรียบเทียบค่าความขุ่น ก่อน-หลัง บำบัด (Physical Purifying Trend Index)
            </h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              เปรียบเทียบอัตราการกรองขจัดมลพิษตะกอนเศษละเอียดอย่างมีเหตุภาพ
            </p>
          </div>
          {treatmentHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-[11px] font-mono text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> ล้างประวัติกราฟ
            </button>
          )}
        </div>

        {treatmentHistory.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
            📭 ยังไม่มีโมเดลสถิติการบำบัดสะสม โปรดกด "เริ่มกระบวนการบำบัด" ด้านบนเพื่อจัดเก็บสถิติลงกราฟในขณะนี้
          </div>
        ) : (
          <div className="space-y-6">
            {/* Custom SVG Bar Chart */}
            <div className="h-60 w-full bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-end">
              
              {/* Graphic Plot area */}
              <div className="flex-1 flex items-end justify-around pb-2 border-b border-slate-200">
                {treatmentHistory.slice(0, 5).reverse().map((run, index) => {
                  const maxVal = Math.max(...treatmentHistory.map(h => h.beforeTurbidity), 100);
                  // Scaled heights
                  const beforeHeight = Math.max((run.beforeTurbidity / maxVal) * 85, 10);
                  const afterHeight = Math.max((run.afterTurbidity / maxVal) * 85, 3);
                  
                  return (
                    <div key={run.id} className="flex flex-col items-center w-1/5 max-w-[90px] relative group">
                      
                      {/* Comparison columns */}
                      <div className="flex items-end gap-1.5 w-full justify-center">
                        {/* Before column (red/amber) */}
                        <div 
                          style={{ height: `${beforeHeight}%` }} 
                          className="w-4 bg-amber-400 rounded-t-sm hover:opacity-80 transition-all flex justify-center relative cursor-help"
                        >
                          {/* Tooltip bubble */}
                          <div className="absolute -top-7 scale-0 group-hover:scale-100 transition-all z-25 bg-slate-900 text-white rounded text-[9px] px-1.5 py-0.5 font-mono pointer-events-none whitespace-nowrap shadow">
                            ก่อน: {run.beforeTurbidity} NTU
                          </div>
                        </div>

                        {/* After column (emerald/clean) */}
                        <div 
                          style={{ height: `${afterHeight}%` }} 
                          className="w-4 bg-emerald-500 rounded-t-sm hover:opacity-80 transition-all flex justify-center relative cursor-help"
                        >
                          <div className="absolute -top-7 scale-0 group-hover:scale-100 transition-all z-25 bg-emerald-700 text-white rounded text-[9px] px-1.5 py-0.5 font-mono pointer-events-none whitespace-nowrap shadow">
                            หลัง: {run.afterTurbidity} NTU
                          </div>
                        </div>
                      </div>

                      {/* Label under coordinate */}
                      <span className="text-[9px] font-medium text-slate-500 mt-2 truncate w-full text-center">
                        {run.sourceName.split('(')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legends explanation */}
              <div className="pt-3 flex justify-center gap-6 text-[10px] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-amber-400 rounded-sm"></span>
                  <span className="text-slate-500">ตะกอนก่อนกรองบำบัด (Raw Waste)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-500 rounded-sm"></span>
                  <span className="text-slate-600">ถังบำบัดปลายทาง (Treated Water)</span>
                </div>
              </div>

            </div>

            {/* Print Friendly Reports Sheet Block (The requested Report Form) */}
            <div id="school-experiment-report" className="border-t border-slate-100 pt-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-sans flex items-center gap-1">
                    <span>📑 รายงานผลการประเมินคุณภาพน้ำ (Printable Laboratory Sheet)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    แบบสรุปวิชาการจากการบำบัดจำลอง สามารถกดสั่งพิมพ์ลงกระดาษขนาด A4 เพื่อทำบอร์ดเสนอผลงานได้ทันที
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-medium cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> พิมพ์รายงาน / ดาวน์โหลด PDF
                </button>
              </div>

              {/* High Contrast printable Layout block styled to render perfectly */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4 max-h-[290px] overflow-y-auto font-mono text-xs text-slate-800 printable-card">
                <div className="text-center font-bold border-b border-slate-300 pb-3 mb-3">
                  <span className="text-sm block">ใบรายงานผลการบำบัดน้ำเสีย เครื่องบำบัดอัจฉริยะ (Smart Water Treatment)</span>
                  <span className="text-[10px] text-slate-500 block font-normal pt-1">โครงการนวัตกรรมสิ่งแวดล้อมประยุกต์ • โรงเรียนแกนนำอนุรักษ์น้ำและชุมชน</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                  <div><strong>วันที่สืบหาข้อมูล:</strong> {new Date().toLocaleDateString('th-TH')}</div>
                  <div><strong>ผู้ตรวจวัดประเมินผล:</strong> ชุมชน/ห้องเรียน นวัตกรรมสิ่งแวดล้อม</div>
                  <div><strong>พารามิเตอร์น้ำดิบเป้าหมาย:</strong> {selectedPreset.name}</div>
                  <div><strong>ความถี่ซิงโครไนซ์บอร์ด:</strong> IoT เครือข่ายคลาวด์แบบต่อเนื่อง</div>
                </div>

                <div className="border-t border-b border-slate-300 py-3 my-3">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-1">ดัชนีชี้วัด (Indicator)</th>
                        <th className="py-1 text-center">ค่าดั้งเดิม (Raw)</th>
                        <th className="py-1 text-center">ค่าหลังบำบัด (Treated)</th>
                        <th className="py-1 text-right">เกณฑ์มาตรฐานสากล</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">ความเป็นกรด-ด่าง (pH)</td>
                        <td className="py-1 text-center">{selectedPreset.pH} pH</td>
                        <td className="py-1 text-center">
                          {currentParams.status === 'completed' ? currentParams.treatedPh.toFixed(1) : '--'}
                        </td>
                        <td className="py-1 text-right">{thresholds.minPh} - {thresholds.maxPh} pH</td>
                      </tr>
                      <tr>
                        <td className="py-1">ความขุ่นตะกอนสาร (Turbidity)</td>
                        <td className="py-1 text-center">{selectedPreset.turbidity} NTU</td>
                        <td className="py-1 text-center">
                          {currentParams.status === 'completed' ? currentParams.treatedTurbidity.toFixed(1) : '--'}
                        </td>
                        <td className="py-1 text-right">&lt; {thresholds.maxTurbidity} NTU</td>
                      </tr>
                      <tr>
                        <td className="py-1">ดัชนีกลิ่นเหม็นสะสม (Odor Index)</td>
                        <td className="py-1 text-center">{selectedPreset.odorIndex} %</td>
                        <td className="py-1 text-center">
                          {currentParams.status === 'completed' ? currentParams.treatedOdorIndex : '--'}
                        </td>
                        <td className="py-1 text-right">&lt; {thresholds.maxOdor} %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-[11px] leading-relaxed">
                  <strong>สรุปผลการทดสอบทางสิ่งแวดล้อม:</strong> น้ำทอนสารแขวนลอยละเอียด ขจัดกลิ่นคาวและตกตะกอนขยะหยาบ มีระดับสภาพความเป็นด่างเจือจางที่เป็นกลาง สะอาดปลอดภัยพร้อมปล่อยคืนสู่หนองคลองธรรมชาติได้อย่างไร้มลพิษ ยอดเยี่ยม!
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
