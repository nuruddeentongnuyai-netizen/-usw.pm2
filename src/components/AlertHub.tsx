import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, ShieldCheck, Settings2, Sparkles, HelpCircle } from 'lucide-react';

interface AlertMessage {
  id: string;
  time: string;
  source: string;
  message: string;
  type: 'warn' | 'critical' | 'resolved';
}

export default function AlertHub() {
  const [alerts, setAlerts] = useState<AlertMessage[]>([
    {
      id: 'a1',
      time: '11:15:24',
      source: 'โมดูลวัดกรด-ด่าง (pH Probe)',
      message: 'ตรวจพบน้ำเสียจากร้านอาหารมีความเป็นกรดรุนแรง (pH 4.2) สูงกว่าขีดจำกัดความปลอดภัยเครื่องจักรเริ่มฉีดสารปรับธาตุเป็นกลาง',
      type: 'warn'
    },
    {
      id: 'a2',
      time: '11:15:26',
      source: 'หัววัดตะกอนหยาบ (Turbidity Monitor)',
      message: 'ตะกอนหยาบและฟิล์มไขมันร้านอาหารเกินเกณฑ์สะสม (480.0 NTU) ระบบสั่งปรับโถกรองคาร์บอนเพิ่ม 25% โดยอัตโนมัติ',
      type: 'critical'
    },
    {
      id: 'a3',
      time: '10:30:17',
      source: 'ท่อสูบน้ำเข้า (Intake Valve)',
      message: 'ล้างตะกอนหยาบคลิกสำเร็จ คืนสภาพปริมาณความขุ่นให้อยู่ในกรณฑ์ปรกติ (3.2 NTU)',
      type: 'resolved'
    }
  ]);

  const [carbCapacity, setCarbCapacity] = useState(82); // Carbon Filter Bed Life %
  const [uvIntensity, setUvIntensity] = useState(95); // UV Bulb Life %

  const handleCleanFilter = () => {
    setCarbCapacity(100);
    const time = new Date().toLocaleTimeString('th-TH');
    setAlerts(prev => [
      {
        id: 'cln-' + Date.now(),
        time,
        source: 'ชุดกรองคาร์บอน (Carbon Bed Assembly)',
        message: 'ผู้ดูแลเปลี่ยนไส้กรองถ่านคาร์บอนเรียบร้อย ฟื้นฟูสมรรถนะกำจัดกลิ่นเน่าเหม็นเต็มพิกัด 100%',
        type: 'resolved'
      },
      ...prev
    ]);
  };

  const handleReplaceUv = () => {
    setUvIntensity(100);
    const time = new Date().toLocaleTimeString('th-TH');
    setAlerts(prev => [
      {
        id: 'uv-' + Date.now(),
        time,
        source: 'หลอดฆ่าเชื้อแสงยูวี (UV-C Sanitizer)',
        message: 'ทำการสลับหลอดรังสี UV-C ขนาดความถี่สูงตัวสำรอง ฟื้นกำลังการกำจัดแบคทีเรียและเชื้อจุลินทรีย์เป็น 100% สำเร็จ',
        type: 'resolved'
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview status box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Core System integrity */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-650" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono font-medium">INTEGRITY STATE</span>
            <span className="text-xs font-bold text-slate-900 block font-sans">สภาพความปลอดภัย</span>
            <span className="text-[10.5px] text-emerald-600 font-semibold block">เสถียร / ปลอดภัยดี</span>
          </div>
        </div>

        {/* Carbon filter life capacity */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600">ไส้กรองแอคทีฟคาร์บอน</span>
            <span className={carbCapacity > 30 ? 'text-emerald-650' : 'text-red-500 font-mono'}>{carbCapacity}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full relative overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                carbCapacity > 50 ? 'bg-emerald-500' : carbCapacity > 20 ? 'bg-amber-400' : 'bg-red-500'
              }`}
              style={{ width: `${carbCapacity}%` }}
            ></div>
          </div>
          <button
            onClick={handleCleanFilter}
            className="text-[9.5px] font-bold font-sans text-emerald-650 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            🔄 เปลี่ยนถ่านคาร์บอนดูดกลิ่น
          </button>
        </div>

        {/* UV bulf intensity life */}
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600">สมรรถนะหลอด UV-C</span>
            <span className={uvIntensity > 30 ? 'text-indigo-650' : 'text-red-500 font-mono'}>{uvIntensity}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full relative overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                uvIntensity > 50 ? 'bg-indigo-500' : 'bg-red-500'
              }`}
              style={{ width: `${uvIntensity}%` }}
            ></div>
          </div>
          <button
            onClick={handleReplaceUv}
            className="text-[9.5px] font-bold font-sans text-indigo-650 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            🔮 เปลี่ยนหลอดฆ่าเชื้อสลับหลอด
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alerts Log list */}
        <div className="lg:col-span-12 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                สถานะการเตือนภัยและขจัดความผิดปกติ (Alarm Console Event Log)
              </h3>
              <p className="text-[11px] text-slate-400">
                พอร์ตการเตือนเชิงประชารัฐ ตรวจวัดน้ำเสียอัตโนมัติ 1 นาทีอย่างแม่นยำ
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              รวมบันทึก: {alerts.length} เหตุการณ์
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {alerts.map((al) => {
              return (
                <div
                  key={al.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                    al.type === 'critical' ? 'bg-red-50/50 border-red-100 text-slate-800' :
                    al.type === 'warn' ? 'bg-amber-50/50 border-amber-100 text-slate-700' :
                    'bg-slate-50 border-slate-100 text-slate-600'
                  }`}
                >
                  <span className={`text-base p-1.5 rounded-lg shrink-0 ${
                    al.type === 'critical' ? 'bg-red-100 text-red-700' :
                    al.type === 'warn' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {al.type === 'critical' ? <AlertTriangle className="w-4 h-4" /> :
                     al.type === 'warn' ? <ShieldAlert className="w-4 h-4" /> :
                     <CheckCircle className="w-4 h-4 text-emerald-650" />}
                  </span>

                  <div className="space-y-1 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="font-bold text-slate-900">{al.source}</strong>
                      <span className="text-[10px] text-slate-400 font-mono font-medium">{al.time}</span>
                    </div>
                    <p className="leading-snug text-[11px]">{al.message}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full inline-block ${
                      al.type === 'critical' ? 'bg-red-100 text-red-800' :
                      al.type === 'warn' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {al.type === 'critical' ? 'CRITICAL - ต้องตรวจสอบด่วน' :
                       al.type === 'warn' ? 'WARNING - กำลังระงับไขมลสาร' :
                       'SUCCESS - แก้ไขเรียบร้อย'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
