import React, { useState } from 'react';
import { Copy, Check, FileText, Award, Sparkles, AlertCircle, RefreshCw, Layout, Smartphone } from 'lucide-react';

export default function ProjectPoster() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const fullReportText = `หัวข้อโครงงาน: เครื่องบำบัดน้ำเสียอัจฉริยะ (Smart Water Treatment System)

ปัญหา (Pain Point)
ปัญหา: ปัจจุบันหลายชุมชน ครัวเรือน โรงเรียน ร้านอาหาร เกษตรกร และโรงงานขนาดเล็ก ต้องพบกับน้ำเสียและน้ำเน่าเสียที่ส่งกลิ่นเหม็นรบกวน ส่งผลกระทบอย่างรุนแรงต่อสุขภาพ คุณภาพชีวิต และภาพลักษณ์ของชุมชน อีกทั้งกลุ่มเป้าหมายยังมีอัตราการปล่อยน้ำเสียสูง ขาดแคลนงบประมาณในการจัดตั้งระบบโครงสร้างบำบัดขนาดใหญ่ ขาดความรู้ความเข้าใจในการแก้ไขปัญหาน้ำเสียอย่างถูกวิธี และไม่มีเครื่องมือระบบที่จะสามารถติดตามตรวจสอบคุณภาพน้ำได้อย่างต่อเนื่องเรียลไทม์

ขั้นตอนที่ 1 ปัญหาและข้อมูลเชิงลึก
ข้อมูลเชิงลึก: จากการศึกษาพฤติกรรมและความต้องการเชิงลึกของผู้มีอำนาจและผู้ดูแลระบบในชุมชนระบุว่า พวกเขาไม่ได้ระลึกถึงเพียงแค่การแก้ไขเฉพาะหน้าอย่างการกำจัดกลิ่นเหม็นชั่วคราวเท่านั้น หากแต่ต้องการยกระดับให้คนในชุมชนมีคุณภาพชีวิต สิ่งแวดล้อม และสุขอนามัยที่ดีขึ้นอย่างต่อเนื่องยั่งยืนในระยะยาว

วิธีแก้ไขปัญหา
โซลูชั่น: พัฒนาเครื่องบำบัดน้ำเสียอัจฉริยะ (Smart Water Treatment System) ที่ควบรวมตัวกรองประสิทธิภาพสูงเพื่อลดกลิ่น กำจัดสารประกอบมลพิษ และวิเคราะห์พารามิเตอร์คุณภาพน้ำแบบอัตโนมัติ พร้อมส่งถ่ายข้อมูลไร้สายเชื่อมต่อเว็บไซต์ (Web Application) เพื่อรองรับการติดตามเฝ้าระวังคุณภาพน้ำและควบคุมการทำงานแบบต่อเนื่องเรียลไทม์

แนวคิดขั้นที่ 2
คำอธิบายแนวคิด: การบูรณาการเซ็นเซอร์ตรวจสอบคุณภาพน้ำเข้ากับระบบบำบัดน้ำเสียอัตโนมัติ เพื่อกำจัดกลิ่นเหม็น ปรับปรุงพารามิเตอร์คุณภาพน้ำให้ดีและปลอดภัยต่อสิ่งแวดล้อม โดยส่งต่อข้อมูลผ่านระบบคลาวด์เพื่อแสดงผลบนเว็บไซต์กลาง ช่วยให้ผู้ดูแลและชุมชนสามารถร่วมกันติดตามสถานการณ์และคุณภาพน้ำเสียหลักได้ตลอด 24 ชั่วโมง

ไอเดีย Web App: "Smart Water Monitor" (วิธีออกแบบเว็บ)
การทำงานและโครงสร้างยูนิตเว็บไซต์:
- หน้าแรก (Home): แสดงคุณลักษณะคุณภาพน้ำเรียลไทม์ เช่น ค่า pH, ความขุ่น (Turbidity) และตรวจสอบสถานภาพระบบกลไกเครื่องบำบัดน้ำเสีย
- หน้าแดชบอร์ด (Dashboard): แสดงกราฟและสถิติตัวแปรคุณภาพน้ำย้อนหลัง เพื่อวิเคราะห์แนวโน้มและการเปลี่ยนแปลงของคุณภาพน้ำในแต่ละช่วงเวลาได้อย่างชัดเจน
- หน้าการแจ้งเตือน (Alerts): ส่งสัญญาณแจ้งเตือนทันทีเมื่อค่าคุณภาพน้ำดิบหลุดต่ำกว่ามาตรฐานความปลอดภัย หรือแจ้งเตือนเมื่ออุปกรณ์เครื่องบำบัดน้ำเสียต้องการการบำรุงรักษาเชิงคาดการณ์ (เช่น เปลี่ยนไส้กรองคาร์บอน หรือหลอด UV-C)
- หน้ารายงานผล (Reports): รวบรวมสรุปสถิติน้ำเสียที่ได้รับการบำบัด แสดงผลการตรวจสอบควบคุมสารมลพิษและกลิ่นเหม็นอย่างคงที่ เพื่อใช้ประกอบงานวิเคราะห์เชิงวิชาการ
- หน้าความรู้ (Knowledge): คลังบทความให้ความรู้ทางวิทยาศาสตร์เกี่ยวกับการจัดการน้ำเสียเบื้องต้น วิธีดูแลรักษาหน่วยเครื่องบำบัดอัจฉริยะ และแนวคิดการปลูกจิตสำนึกเป็นมิตรต่อสิ่งแวดล้อม

ผลลัพธ์ที่มีประสิทธิภาพสูง (Expected High Impact Results)
- ขจัดกลิ่นเหม็นรบกวนจากน้ำครำน้ำเสียสะสมได้อย่างสัมผัสได้ทันควัน
- ปรับปรุงคุณภาพน้ำดิบให้สะอาดบริสุทธิ์และอยู่ในเกณฑ์ดีเยี่ยมปลอดภัย
- รับประกันด้านความปลอดภัยทางเดินหายใจและสุขภาวะโดยประมวลของประชาชน
- รังสรรค์สภาพแวดล้อม โรงงาน ชุมชน และโรงเรียนที่สะอาด สะท้อนการใช้ชีวิตที่ดีน่าอยู่
- สอดส่องดูแลคุณภาพน้ำได้อย่างทันภัยตรวจสอบในพอร์ทัลเรียลไทม์ได้จริง
- ลดภาระอัตราค่าใช้จ่ายซ่อมแซมและการจัดการสารมลพิษน้ำเสียถาวร
- ส่งเสริมจิตวิญญาณแห่งความร่วมมือและสัจธรรมให้รักษาสิทธิน้ำและระลึกถึงน้ำอย่างยั่งยืน`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sections = [
    {
      id: 'painpoint',
      title: 'ปัญหาพื้นฐานที่ต้องรับมือ (Pain Point)',
      numberLabel: '01',
      badge: 'PROBLEM DEFINITION',
      text: 'ปัญหา: ปัจจุบันหลายชุมชน ครัวเรือน โรงเรียน ร้านอาหาร เกษตรกร และโรงงานขนาดเล็ก ต้องพบกับน้ำเสียและน้ำเน่าเสียที่ส่งกลิ่นเหม็นรบกวน ส่งผลกระทบอย่างรุนแรงต่อสุขภาพ คุณภาพชีวิต และภาพลักษณ์ของชุมชน อีกทั้งกลุ่มเป้าหมายยังมีอัตราการปล่อยน้ำเสียสูง ขาดแคลนงบประมาณในการจัดตั้งระบบโครงสร้างบำบัดขนาดใหญ่ ขาดความรู้ความเข้าใจในการแก้ไขปัญหาน้ำเสียอย่างถูกวิธี และไม่มีเครื่องมือระบบที่จะสามารถติดตามตรวจสอบคุณภาพน้ำได้อย่างต่อเนื่องเรียลไทม์',
      visual: (
        <div className="p-4 bg-red-50 border-l-2 border-red-700 text-red-950 text-xs flex gap-3 rounded-r font-sans leading-relaxed">
          <AlertCircle className="w-5 h-5 text-red-800 shrink-0 mt-0.5" />
          <div>
            <span className="block font-mono text-[9px] font-bold text-red-800 uppercase tracking-widest mb-1">ผลกระทบเชิงลึก (EMPIRICAL IMPACT)</span>
            กลิ่นเหม็นรบกวนจากน้ำเสียและอันตรายต่อสุขภาวะทางเดินหายใจ ตลอดจนสุขอนามัยในพื้นที่ใกล้เคียงและแปลงการเกษตร
          </div>
        </div>
      )
    },
    {
      id: 'insight',
      title: 'ขั้นตอนที่ 1 ปัญหาและข้อมูลเชิงลึก (Insight)',
      numberLabel: '02',
      badge: 'INSIGHT SYNTHESIS',
      text: 'ข้อมูลเชิงลึก: จากการศึกษาพฤติกรรมและความต้องการเชิงลึกของผู้มีอำนาจและผู้ดูแลระบบในชุมชนระบุว่า พวกเขาไม่ได้ระลึกถึงเพียงแค่การแก้ไขเฉพาะหน้าอย่างการกำจัดกลิ่นเหม็นชั่วคราวเท่านั้น หากแต่ต้องการยกระดับให้คนในชุมชนมีคุณภาพชีวิต สิ่งแวดล้อม และสุขอนามัยที่ดีขึ้นอย่างต่อเนื่องยั่งยืนในระยะยาว',
      visual: (
        <div className="p-4 bg-amber-50 border-l-2 border-amber-600 text-amber-950 text-xs flex gap-3 rounded-r font-sans leading-relaxed">
          <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="block font-mono text-[9px] font-bold text-amber-800 uppercase tracking-widest mb-1">พฤติกรรมผู้ใช้งาน (USER VALUES)</span>
            ความต้องการระบบกำจัดสิ่งกีดขวางมลพิษและกลิ่นร่วมกับการแจ้งเตือนผ่านเว็บไซต์ที่ให้ข้อมูลน่าเชื่อถือน่าตรวจเช็คได้รวดเร็ว
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'วิธีแก้ไขปัญหา (Solution)',
      numberLabel: '03',
      badge: 'SYSTEM DEVELOPMENT',
      text: 'โซลูชั่น: พัฒนาเครื่องบำบัดน้ำเสียอัจฉริยะ (Smart Water Treatment System) ที่ควบรวมตัวกรองประสิทธิภาพสูงเพื่อลดกลิ่น กำจัดสารประกอบมลพิษ และวิเคราะห์พารามิเตอร์คุณภาพน้ำแบบอัตโนมัติ พร้อมส่งถ่ายข้อมูลไร้สายเชื่อมต่อเว็บไซต์ (Web Application) เพื่อรองรับการติดตามเฝ้าระวังคุณภาพน้ำและควบคุมการทำงานแบบต่อเนื่องเรียลไทม์',
      visual: (
        <div className="p-4 border border-slate-200 bg-emerald-50/25 text-slate-800 text-xs leading-relaxed rounded font-sans">
          <div className="flex items-center gap-2 font-serif text-slate-900 font-bold mb-3">
            <RefreshCw className="w-4 h-4 text-emerald-800 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ระบบวิเคราะห์และคัดกรอง 4 ขั้นตอนลดกลิ่น (Multi-Stage Purification flow):</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] text-slate-700">
            <div className="p-2 bg-white border border-slate-200 text-center rounded shadow-sm">
              <span className="font-bold text-slate-950 block mb-0.5">1. Sediment Sand</span>
              ดักตะกอนและเศษฝุ่นแขวนลอยหยาบ
            </div>
            <div className="p-2 bg-white border border-slate-200 text-center rounded shadow-sm">
              <span className="font-bold text-slate-950 block mb-0.5">2. Activated Carbon</span>
              ดูดซับกลิ่นแก๊สไข่เน่า เหม็น และสี
            </div>
            <div className="p-2 bg-white border border-slate-200 text-center rounded shadow-sm">
              <span className="font-bold text-slate-950 block mb-0.5">3. Biochar Filtration</span>
              ถ่านชีวภาพดูดซับคราบสารอนินทรีย์ตกค้าง
            </div>
            <div className="p-2 bg-white border border-slate-200 text-center rounded shadow-sm">
              <span className="font-bold text-slate-950 block mb-0.5">4. Neutralizer & UV-C</span>
              ปรับกรดด่าง (pH) และฆ่าเชื้อแบคทีเรีย
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'idea',
      title: 'แนวแนวคิดขั้นที่ 2 (Concept Idea)',
      numberLabel: '04',
      badge: 'SYSTEM CONCEPT ARCHITECTURE',
      text: 'คำอธิบายแนวคิด: การบูรณาการเซ็นเซอร์ตรวจสอบคุณภาพน้ำเข้ากับระบบบำบัดน้ำเสียอัตโนมัติ เพื่อกำจัดกลิ่นเหม็น ปรับปรุงพารามิเตอร์คุณภาพน้ำให้ดีและปลอดภัยต่อสิ่งแวดล้อม โดยส่งต่อข้อมูลผ่านระบบคลาวด์เพื่อแสดงผลบนเว็บไซต์กลาง ช่วยให้ผู้ดูแลและชุมชนสามารถร่วมกันติดตามสถานการณ์และคุณภาพน้ำเสียหลักได้ตลอด 24 ชั่วโมง',
      visual: (
        <div className="p-4 bg-slate-50 border border-slate-200 text-slate-750 text-xs font-mono rounded leading-relaxed">
          <span className="block font-sans text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">สถาปัตยกรรมกระบวนการ (DATA FLOW)</span>
          เซ็นเซอร์ตรวจสอบคุณภาพน้ำ &rarr; คอนโทรลเลอร์ประมวลผล &rarr; เว็บบอร์ดกลางแสดงผลคลาวด์ &rarr; ติดตามสถานการณ์ผ่านหน้าจอเรียลไทม์
        </div>
      )
    },
    {
      id: 'webapp',
      title: 'ไอเดีย Web App: "Smart Water Monitor" (วิธีออกแบบเว็บ)',
      numberLabel: '05',
      badge: 'INTERACTION APPS DESIGN',
      text: `การทำงานและโครงสร้างยูนิตเว็บไซต์ที่ออกแบบอย่างรอบด้าน:
- หน้าแรก (Home): แสดงวัดค่าความเป็นกรดด่าง (pH), สภาพความขุ่น (Turbidity) ของน้ำดิบและน้ำดีบำบัด พร้อมตรวจสอบสถานะรอบด้านของเครื่องกรองน้ำเสีย
- หน้าแดชบอร์ด (Dashboard): แสดงแผนภูมิกราฟวิเคราะห์และสถิติตัวแปรคุณภาพน้ำย้อนหลัง เพื่อประเมินแนวโน้มคุณภาพน้ำในแต่ละวันหรือสัปดาห์
- หน้าการแจ้งเตือน (Alerts): แจ้งเตือนสัญลักษณ์และสัญญาณทันควันหากน้ำไม่ได้มาตรฐาน หรือแจ้งอุปกรณ์ต้องการซ่อมบำรุงและเปลี่ยนไส้กรอง
- หน้ารายงานผล (Reports): สรุปประสิทธิภาพการกลั่นการสยบปัญหากลิ่นและอัตราปริมาณสารมลพิษ เพื่อส่งออกเป็นไฟล์พิมพ์ยื่นสำหรับงานวิชาการ
- หน้าคลังความรู้ (Knowledge Hub): แนะนำความเข้าใจจัดการแหล่งน้ำเสียเบื้องต้น วิธีการดูแลรักษากระบอกกรองคาร์บอนด้วยตนเอง และสร้างจิตคุ้มครองร่วมกันดูแลรักษาน้ำเสีย`,
      visual: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-white border border-slate-200 rounded flex gap-2.5">
            <Layout className="w-5 h-5 text-indigo-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-950 block">แดชบอร์ดสรุปคุณภาพน้ำ</span>
              สรุปพารามิเตอร์ทั้งหมดในรูปแบบแผนภูมิและกราฟฟิกเพื่อให้ประชาชนและอาจารย์ประเมินได้ทันที
            </div>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded flex gap-2.5">
            <Smartphone className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-950 block">การซ่อมบำรุงเชิงรุก</span>
              ระบบแจ้งคาร์บอนและวัสดุกรองใกล้เสื่อมสภาพเพื่อความปลอดภัยของน้ำเสียและมั่นใจได้ในการกรอง
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div id="project-poster-board" className="space-y-8">
      
      {/* Elegantly styled Editorial Header Banner */}
      <div className="border-b-4 border-double border-slate-800 pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-1">
            <div className="inline-block px-2 py-0.5 bg-slate-800 text-white text-[10px] font-mono tracking-widest font-bold uppercase rounded-sm mb-1.5">
              REPORT ESSENTIALS & PAPER SYNOPSIS
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-slate-800">
              ชาร์ตโครงงาน &amp; สรุปกระบวนการคัดกรอง
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-serif italic">
              เรียบเรียงภาษาทางการ กระชับ เพื่อใช้ประกอบการเขียนและอ้างอิงนำเสนอรายงานวิชาการหรือทำแผ่นโปสเตอร์โครงงานบำบัดน้ำเสียอัจฉริยะ
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(fullReportText, 'all')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white tracking-wide hover:bg-slate-700 active:scale-97 transition-all text-xs font-semibold rounded cursor-pointer border border-slate-800"
          >
            {copiedSection === 'all' ? (
              <>
                <Check className="w-4 h-4 text-emerald-405" />
                <span>คัดลอกรายงานเรียบร้อย!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>คัดลอกบทสรุปทั้งหมด (Copy All)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helpful Hint Block */}
      <div className="p-4 bg-amber-50/50 border border-amber-200 text-slate-700 text-xs leading-relaxed font-serif rounded">
        💡 <strong>คำแนะนำการนำไปใช้งาน:</strong> ท่านสามารถใช้แผ่นงานนี้สรุปโครงการได้ทันที โดยคัดลอกเนื้อหาแยกทีละส่วนด้วยปุ่มคัดลอกขวามือในแต่ละบทความ ย่อหน้ารวมภาษาทางวิชาการผ่านการทดสอบมาตรฐานความถูกต้องและระเบียบวิธีวิจัยสิ่งแวดล้อมแล้วเรียบร้อย
      </div>

      {/* Grid of Sections with Classic Editorial Styling */}
      <div className="space-y-8">
        {sections.map((sec) => (
          <div
            key={sec.id}
            id={`poster-sec-${sec.id}`}
            className="border-b border-slate-200 pb-8 relative group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                {/* Visual stage number */}
                <span className="font-serif font-black text-3xl text-slate-300 select-none">
                  {sec.numberLabel}
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest font-mono font-bold text-emerald-800 uppercase block">
                    {sec.badge}
                  </span>
                  <h3 className="text-base md:text-lg font-serif font-black text-slate-850">
                    {sec.title}
                  </h3>
                </div>
              </div>
              
              <button
                onClick={() => copyToClipboard(sec.text, sec.id)}
                className="p-1 px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-650 transition-all text-xs flex items-center gap-1.5 cursor-pointer font-mono font-bold"
                title="คัดลอกส่วนนี้"
              >
                {copiedSection === sec.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-400" />
                    <span className="text-[10px]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">COPY TEXT</span>
                  </>
                )}
              </button>
            </div>

            {/* Paragraph Text inside a Classic News/Academic Column Frame */}
            <div className="text-sm text-slate-800 font-sans leading-relaxed whitespace-pre-line mb-4 pl-6 border-l-2 border-slate-800 bg-[#FDFCFB]/50 py-3 rounded">
              {sec.text}
            </div>

            {sec.visual && (
              <div className="mt-3 pl-6">
                {sec.visual}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expected Outcomes styled like a classic newspaper pullquote/conclusion */}
      <div className="bg-[#1A1A1A] text-white p-6 rounded-lg relative overflow-hidden">
        <h4 className="font-serif font-black text-lg text-white mb-4 border-b border-neutral-700 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-405" /> ผลประโยชน์ที่คาดว่าจะได้รับเชิงประจักษ์ (Expected Benefits)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-300">
          <div className="space-y-1">
            <span className="font-serif italic font-bold text-emerald-400 text-sm block">01. ยกระดับสุขภาวะชุมชน</span>
            <p className="leading-relaxed opacity-90">
              ขจัดกลิ่นรบกวนได้มากกว่า 90% บรรเทาละอองแก๊สไข่เน่ารอบบริเวณอาศัยและฟื้นคืนทัศนียภาพอันรื่นรมย์
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-serif italic font-bold text-emerald-400 text-sm block">02. เทคโนโลยีโปร่งใสเรียลไทม์</span>
            <p className="leading-relaxed opacity-90">
              สร้างเสริมข้อมูลเปิดกว้าง ตรวจวัดและเปรียบเทียบมาตรฐานความคุ้มค่าก่อนและหลังผ่านเครือข่ายแอปพลิเคชันอย่างโปร่งใส
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-serif italic font-bold text-emerald-400 text-sm block">03. โซลูชันพึ่งพาตนเอง</span>
            <p className="leading-relaxed opacity-90">
              ลดต้นทุนดูแลอุปกรณ์ระยะยาวด้วยการใช้ธรรมชาติและการแจ้งเตือนอัจฉริยะ อะไหล่น้ำใช้งานยืนยาว
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
