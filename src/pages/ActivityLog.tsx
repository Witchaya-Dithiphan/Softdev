import { useState } from 'react';
import Layout from '../components/Layout';

const logs = Array.from({ length: 10 }, (_, i) => ({
  datetime: '01/08/26 08:15',
  user: 'สมชาย (เจ้าของหอ)',
  action: 'เข้าสู่ระบบ',
  ip: '203.150.11.90',
  device: 'macOS',
}));

const actionTypes = [
  'เข้าสู่ระบบ / ออกจากระบบ',
  'เข้าสู่ระบบ / ออกจากระบบ',
  'เข้าสู่ระบบ / ออกจากระบบ',
  'เข้าสู่ระบบ / ออกจากระบบ',
  'เข้าสู่ระบบ / ออกจากระบบ',
  'เข้าสู่ระบบ / ออกจากระบบ',
];

export default function ActivityLog() {
  const [userFilter, setUserFilter] = useState('ทั้งหมด');
  const [selectedTypes, setSelectedTypes] = useState<Set<number>>(new Set());
  const [dateRange] = useState('01/08/26 - 05/09/26');

  const toggleType = (i: number) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <Layout requiredRole="owner">
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">ประวัติการใช้งานระบบ</span>
        <div className="flex items-center gap-3">
          <button className="border border-black h-[51px] px-6 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
            ส่งออก csv
          </button>
          <button className="border border-black h-[51px] px-6 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
            {dateRange}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 gap-0 p-5">
        {/* Filter panel */}
        <div className="bg-white border border-black w-[280px] flex-shrink-0 flex flex-col p-5 gap-5">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">Filters</span>

          {/* User filter */}
          <div className="flex flex-col gap-3">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">ผู้ใช้งาน</span>
            <div className="border border-black flex items-center justify-between px-3 py-2">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{userFilter}</span>
              <span>▾</span>
            </div>
          </div>

          {/* Action type filter */}
          <div className="flex flex-col gap-3">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">ประเภท</span>
            <div className="flex flex-col gap-2">
              {actionTypes.map((type, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.has(i)}
                    onChange={() => toggleType(i)}
                    className="w-3 h-3 border border-black"
                  />
                  <span className="font-['Inter:Regular'] font-normal text-base text-black">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-black h-[51px] font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
              กรองข้อมูล
            </button>
          </div>
        </div>

        {/* Log table */}
        <div className="bg-white border border-black border-l-0 flex-1 overflow-auto">
          <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr] h-[54px] items-center px-5 gap-4">
            {['วันเวลา', 'ผู้ใช้งาน', 'การกระทำ', 'IP', 'อุปกรณ์'].map(col => (
              <span key={col} className="font-['Inter:Regular'] font-normal text-base text-black">{col}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-5">
            {logs.map((log, i) => (
              <div key={i} className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr] items-center gap-4">
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{log.datetime}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{log.user}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{log.action}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{log.ip}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{log.device}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
