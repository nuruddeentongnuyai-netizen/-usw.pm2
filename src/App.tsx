import React, { useState } from 'react';
import { 
  Award, LayoutDashboard, AlertCircle, BookOpen, Activity, 
  HelpCircle, Settings, ClipboardList, RefreshCw, Layers
} from 'lucide-react';
import { TabId } from './types';
import ProjectPoster from './components/ProjectPoster';
import WastewaterSimulator from './components/WastewaterSimulator';
import AlertHub from './components/AlertHub';
import KnowledgeBase from './components/KnowledgeBase';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('poster');
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; text: string }>>([]);

  const addAlertNotification = (title: string, message: string, severity: 'warn' | 'critical') => {
    const id = 'notif-' + Date.now();
    setNotifications(prev => [{ id, title, text: message }, ...prev].slice(0, 3));
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col antialiased font-sans">
      
      {/* Top Academic & Editorial Header */}
      <header className="bg-brand-bg border-b-2 border-brand-text sticky top-0 z-35 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            
            {/* Logo and project identity */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-xl font-black rounded-lg">
                SW
              </div>
              <div>
                <span className="text-[10px] tracking-widest font-bold font-mono text-emerald-800 uppercase block">CASE STUDY / ENVIRONMENTAL INNOVATION</span>
                <span className="text-xl font-serif font-bold text-[#1A1A1A] block leading-tight mt-0.5">
                  Smart Water Treatment System
                </span>
              </div>
            </div>

            {/* Quick status bar indicator */}
            <div className="flex items-center gap-3 text-[10.5px] font-mono opacity-80">
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded border border-emerald-300/40 text-emerald-900 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>SYSTEM STATUS: ONLINE</span>
              </div>
              <span className="hidden lg:inline text-gray-400">|</span>
              <span className="hidden lg:inline uppercase">Loc: Community Hub 04</span>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Side Tab selection column */}
        <div className="w-full md:w-64 shrink-0 space-y-5">
          
          <div className="border border-slate-300 bg-white p-4 space-y-1.5 rounded-lg shadow-sm">
            <p className="text-[9px] font-bold text-gray-400 font-mono tracking-widest px-2 pb-2 uppercase border-b border-gray-100 mb-2">
              Navigation Table
            </p>

            {/* Tab: Project summary poster (Requested format) */}
            <button
              onClick={() => setActiveTab('poster')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold select-none transition-all cursor-pointer ${
                activeTab === 'poster'
                  ? 'bg-brand-text text-white font-serif italic'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ClipboardList className="w-4 h-4 shrink-0" />
              <span>📘 สรุปกระบวนการ & โปสเตอร์</span>
            </button>

            {/* Tab: Real Wastewater Treatment Simulator dashboard */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold select-none transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-brand-text text-white font-serif italic'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>💧 แดชบอร์ดตรวจสอบคุณภาพน้ำ</span>
            </button>

            {/* Tab: Interactive Alarm control center & filters life */}
            <button
              onClick={() => setActiveTab('alerts')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold select-none transition-all cursor-pointer ${
                activeTab === 'alerts'
                  ? 'bg-brand-text text-white font-serif italic'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>⚠️ แผงวิเคราะห์การเตือนภัย</span>
            </button>

            {/* Tab: Wastewater Management Knowledge Base */}
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold select-none transition-all cursor-pointer ${
                activeTab === 'knowledge'
                  ? 'bg-brand-text text-white font-serif italic'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>🧠 บทความวิชาการเพื่อสิ่งแวดล้อม</span>
            </button>
          </div>

          {/* Environmental awareness card prompt — Styled like a blockquote/clipping */}
          <div className="bg-emerald-50/55 border-l-4 border-emerald-800 p-5 rounded space-y-2.5">
            <span className="text-[10px] font-mono font-bold text-emerald-800 tracking-wider">ECO FOCUS PERSPECTIVE</span>
            <p className="font-serif italic text-sm text-[#2D3748] leading-relaxed">
              &ldquo;การฟื้นฟูแหล่งน้ำชุมชนเริ่มต้นด้วยข้อมูลโปร่งใส เทคโนโลยีช่วยตรวจสอบ และจิตสำนึกร่วมใจกันเพื่อประโยชน์อันยั่งยืน&rdquo;
            </p>
            <div className="text-[10px] text-emerald-800 font-mono uppercase bg-emerald-100/60 px-2 py-0.5 rounded inline-block">
              Green Science Expo 2026
            </div>
          </div>

        </div>

        {/* Right Side Content Container */}
        <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
          
          {/* Dynamic Tab renders */}
          {activeTab === 'poster' && <ProjectPoster />}
          
          {activeTab === 'dashboard' && (
            <WastewaterSimulator onAddAlert={addAlertNotification} />
          )}

          {activeTab === 'alerts' && <AlertHub />}

          {activeTab === 'knowledge' && <KnowledgeBase />}

        </div>

      </main>

      {/* Elegant Editorial Academic Footer */}
      <footer className="border-t-2 border-brand-text bg-white py-8 mt-12 text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-serif italic text-sm text-brand-text font-bold mb-1">
              โครงงานเครื่องบำบัดน้ำเสียอัจฉริยะ (Smart Water Treatment System)
            </p>
            <p className="text-[11px] opacity-80">
              วิชาการนวัตกรรมสิ่งแวดล้อมประยุกต์และวิทยาศาสตร์ IoT ชุมชนแกนนำรักสิ่งแวดล้อมสากล
            </p>
          </div>
          <div className="bg-[#1A1A1A] text-white px-4 py-2 font-bold uppercase tracking-wider text-[11px] rounded">
            SCIENCE EXPO 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
