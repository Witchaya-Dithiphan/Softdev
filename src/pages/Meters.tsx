import { useState } from 'react';
import Layout from '../components/Layout';

const meters = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  room: `${(i % 3) + 1}0${(i % 9) + 1}`,
  meterNo: `M-${1000 + i}`,
  lastValue: (100 + i * 7).toFixed(1),
  unit: 'หน่วย',
  lastUpdate: '01/09/26',
  device: 'Smart Meter',
}));

const abnormalUsers = [
  { room: '201', usage: 450 },
  { room: '305', usage: 380 },
  { room: '108', usage: 320 },
];

export default function Meters() {
  const [activeTab, setActiveTab] = useState<'น้ำ' | 'ไฟ'>('น้ำ');

  return (
    <Layout requiredRole="caretaker">
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-['Inter:Medium'] font-medium text-2xl text-black">มิเตอร์</span>
          {/* Tabs */}
          <div className="flex">
            {(['น้ำ', 'ไฟ'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-[38px] px-6 border border-black font-['Inter:Regular'] font-normal text-base transition-colors ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-black h-[51px] px-6 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
          + เพิ่มห้องพัก
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 gap-5 p-5">
        {/* Table */}
        <div className="bg-white border border-black flex-1 overflow-auto">
          <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] h-[54px] items-center px-5 gap-4">
            {['เลขห้อง', 'เลขมิเตอร์', 'ค่าล่าสุด', 'หน่วยที่ใช้', 'อัปเดตล่าสุด', 'อุปกรณ์'].map(col => (
              <span key={col} className="font-['Inter:Regular'] font-normal text-base text-black">{col}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-5">
            {meters.map((m) => (
              <div key={m.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4">
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{m.room}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{m.meterNo}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{m.lastValue}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{m.unit}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{m.lastUpdate}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{m.device}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panels */}
        <div className="flex flex-col gap-5 w-[280px] flex-shrink-0">
          {/* Abnormal usage */}
          <div className="bg-white border border-black p-4 flex flex-col gap-3">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">การใช้งานผิดปกติ</span>
            {abnormalUsers.map((u) => (
              <div key={u.room} className="bg-[#d9d9d9] h-[50px] flex items-center px-3 gap-3">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">ห้อง {u.room}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black flex-1">{u.usage} หน่วย</span>
              </div>
            ))}
          </div>

          {/* Usage chart */}
          <div className="bg-white border border-black p-4 flex flex-col gap-3 flex-1">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">กราฟการใช้งาน – ห้อง 607</span>
            <div className="flex-1 bg-[#d9d9d9] min-h-[180px]" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
