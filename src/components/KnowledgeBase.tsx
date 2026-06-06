import React, { useState } from 'react';
import { BookOpen, Key, Settings, Heart, ArrowUpRight, HelpCircle, Droplet, ShieldAlert, Sparkles } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  category: 'management' | 'maintenance' | 'conservation';
  title: string;
  description: string;
  points: string[];
  tips: string;
  icon: string;
}

const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'k1',
    category: 'management',
    title: 'หลักการทางวิทยาศาสตร์ในการจัดการน้ำเสียขั้นต้น',
    description: 'การจัดการน้ำเสียอย่างถูกวิธีไม่ได้ซับซ้อนอย่างที่คิด ทุกคนสามารถช่วยกันบุกเบิกคัดกรองขยะเปียกและแยกสารแขวนลอยก่อนปล่อยไหลลงแหล่งน้ำได้ โดยเน้นเกณฑ์วัดสำคัญ 3 ประการดังนี้:',
    points: [
      'ดัชนีความเป็นกรด-ด่าง (pH): น้ำธรรมชาติที่ดีควรมีค่า pH อยู่ระหว่าง 6.5 - 8.5 หากน้ำเน่าขังมักจะมีค่าที่เป็นกรดสูง (ต่ำกว่า 6) ส่งผลร้ายทำลายผิวหนังสัตว์น้ำและกัดเซาะผิวเนื้อไม้ไพพ์',
      'ค่าความขุ่น (Turbidity): วัดปริมาณเศษสารอินทรีย์ ฝุ่นละออง และคราบแป้งเข้มข้น มีหน่วยวัดคือ NTU อัตราค่า NTU ยิ่งสูงจะบดบังแสงอาทิตย์ไม่ให้ส่องถึงพืชน้ำ ชุมชนจึงไม่สามารถผลิตก๊าซออกซิเจนธรรมชาติได้',
      'สารอินทรีย์ย่อยสลายยาก: คราบไขมันลอยหน้าจากร้านอาหารมักกลายเป็นฟิล์มขัดความโปร่งใส ปิดกั้นการถ่ายเทออกซิเจนระเหย และดักฝุ่นกลายเป็นตมสีดำอันเปราะเปื้อน'
    ],
    tips: 'ข้อแนะนำหลัก: ควรจัดตั้งหลุมบ่อดักคราบน้ำมันขั้นต้น (Graisse Separator) ไว้ใต้อ่างล้างจานทุกครัวเรือน เพื่อลดความหนาแน่นตะกอนหนักก่อนปล่อยเข้าถังตัวกรองอัจฉริยะ',
    icon: '💡'
  },
  {
    id: 'k2',
    category: 'maintenance',
    title: 'คู่มือบำรุงรักษาเครื่องกรองน้ำอัจฉริยะอย่างยั่งยืน',
    description: 'เพื่อให้ระบบถังบำบัดน้ำอัจฉริยะสามารถทำงานหมุนเวียนล้างตะกอนได้ต่อเนื่องหลายปีโดยไม่เสื่อมสภาพ คณะผู้จัดทำและผู้ดูแลชุมชนควรตรวจสอบตามแนวทางซ่อมบำรุงเชิงรุกดังนี้:',
    points: [
      'ล้างทำความสะอาดแผ่นกรองตะกอนหยาบ (Fine Sand Filter): ทุกๆ 2-4 สัปดาห์ ควรดึงไส้กรองทละเอียดหรือชั้นทรายด้านหน้าออกฉีดชะตะกอนคราบบนหน้าออก เพื่อป้องกันปัญหาน้ำไหลชะตัวช้าหรือเอ่อล้นถังด้านข้าง',
      'การเปลี่ยนแผ่น Activated Carbon ฟิลเตอร์: ไส้ถ่านคาร์บอนและคาร์บอนกัมมันต์มีอายุขัยการดูดซับฟิล์มกลิ่นเน่าเสียสะสมประมาณ 3 - 6 เดือน ควรเปลี่ยนชิ้นส่วนใหม่เมื่อพารามิเตอร์ดัชนีกลิ่นสเกลวัดค้างเกิน 15%',
      'การดูแลหัวเซ็นเซอร์วัดค่าเคมี (pH Probe Calibration): ล้างทำความสะอาดปลายแท่งเซ็นเซอร์ pH ด้วยน้ำสะอาดเป็นน้ำกลั่นธรรมดา เพื่อลบคราบบูดเบี้ยวและตะไคร่น้ำที่อาจเกาะเกล็ดทำตัวเลขอ่านเพี้ยน'
    ],
    tips: 'ข้อมูลเชิงช่าง: การติดตั้งถ่านชีวภาพ (Biochar) ที่หาได้ง่ายในภาคเกษตรกรรม เช่น แกลบดำเผา ชวนเสริมทักษะลดงบประมาณจัดซื้อแผ่นฟิลเตอร์แพงๆ และกำจัดกลิ่นได้อย่างดีเยี่ยม!',
    icon: '🔧'
  },
  {
    id: 'k3',
    category: 'conservation',
    title: 'จิตสำนึกและการอนุรักษ์ทรัพยากรน้ำสากลร่วมกัน',
    description: 'การแก้ปัญหาวารีมลพิษระยะยาวให้ยั่งยืน ไม่ได้เกิดจากการบำบัดน้ำที่ปลายทางเท่านั้น แต่ขึ้นกับการปรับเปลี่ยนพฤติกรรมในครัวเรือนเพื่อฟื้นฟูธรรมชาติร่วมใจผ่านแนวคิดวิชาการง่ายๆ ดังนี้:',
    points: [
      'แนวคิด 3R จัดหาชีวิตประหยัดน้ำ: Reduce (ลดน้ำใช้ล้างเครื่องถ้วยแบบสูญเปล่า), Reuse (นำน้ำล้างผักผลไม้ธรรมชาติ มารดน้ำพฤกษาแปลงสวนผักสวนครัว), Recycle (นำน้ำผ่านการบำบัดอัจฉริยะกลับมาใช้ซักล้างพื้นภายนอก)',
      'งดใช้ผงซักฟอกและฟอสเฟตเข้มข้น: พยายามลดการทิ้งสารซักล้างที่มีสารฟอสเฟตสูงลงท่อสาธารณะ เนื่องจากจะเร่งกระตุ้นปรากฏการณ์สาหร่ายสระน้ำบูม (Eutrophication) กินแก๊สออกซิเจนหมดบ่อ',
      'ร่วมใจพัฒนาถังดักขยะหอนรักษ์สิ่งแวดล้อม: ติดตั้งตะแกรงรังผึ้งบริเวณท่อระบายน้ำทรายหน้าบ้านทุกคน เพื่อตัดตอนเศษพลาสติกไม่ให้ลอยไหลไปสะสมเน่าอุดตันตามหุบห้วยลุ่มลึก'
    ],
    tips: 'หลักคิดอนุรักษ์: น้ำสะอาดทุกลิตรที่ประหยัดได้ คือต้นทุนพลังงานสูบจ่ายและบำบัดทางเคมีที่ลดลง ช่วยคืนความสมดุลและความสุขให้พืชและสัตว์ป่าตามริมแม่น้ำสายหลัก',
    icon: '🌱'
  }
];

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState<'all' | 'management' | 'maintenance' | 'conservation'>('all');

  const filteredItems = activeTab === 'all' 
    ? KNOWLEDGE_ITEMS 
    : KNOWLEDGE_ITEMS.filter(it => it.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Category selector pills */}
      <div className="flex flex-wrap gap-2 pb-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-emerald-650 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          📚 ทั้งหมด (Knowledge Bank)
        </button>
        <button
          onClick={() => setActiveTab('management')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeTab === 'management'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          💡 การจัดการน้ำเสียเบื้องต้น
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeTab === 'maintenance'
              ? 'bg-cyan-700 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          🔧 คู่มือการดูแลระบบบำบัด
        </button>
        <button
          onClick={() => setActiveTab('conservation')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
            activeTab === 'conservation'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          🌿 การอนุรักษ์สิ่งแวดล้อม
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 text-7xl opacity-5 pointer-events-none p-4">
              {item.icon}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                {item.icon}
              </span>
              <div>
                <span className={`text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-full ${
                  item.category === 'management' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                  item.category === 'maintenance' ? 'bg-cyan-50 text-cyan-700 border border-cyan-100' :
                  'bg-indigo-50 text-indigo-700 border border-indigo-100'
                }`}>
                  {item.category === 'management' ? 'ENVIRONMENT SCIENCE' :
                   item.category === 'maintenance' ? 'HARDWARE MANUAL' :
                   'CONSERVATION SPIRIT'}
                </span>
                <h3 className="text-base font-bold text-slate-950 font-sans mt-1">
                  {item.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {item.description}
            </p>

            {/* List Points */}
            <div className="space-y-2 mb-4 pl-1">
              {item.points.map((pt, ind) => {
                const parts = pt.split(':');
                return (
                  <div key={ind} className="flex gap-2.5 text-xs text-slate-700 items-start leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                    <div>
                      {parts.length > 1 ? (
                        <>
                          <strong className="text-slate-900 font-bold">{parts[0]}:</strong>
                          <span>{parts.slice(1).join(':')}</span>
                        </>
                      ) : (
                        <span>{pt}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pro Tips Highlight */}
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-850 text-xs leading-relaxed flex gap-2">
              <Sparkles className="w-4 h-4 text-emerald-650 shrink-0 mt-0.5" />
              <div>
                <strong>เคล็ดลับสีเขียว:</strong> {item.tips}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
