import { useState } from 'react';
import Layout from '../components/Layout';

type Tab = 'การยืม' | 'คลังของ' | 'ประวัติ';

const stats = [
  { label: 'กำลังยืม', value: 6 },
  { label: 'เกินกำหนดคืน', value: 2 },
  { label: 'ยอดมัดจำรวม', value: '2,500' },
];

const borrowItems = Array.from({ length: 10 }, (_, i) => ({
  id: `MC-0${i === 0 ? 1 : 2}`,
  item: 'ไมโครเวฟ',
  borrower: 'สมชาย - 607',
  borrowDate: '28/02/26',
  dueDate: '28/02/27',
  status: i === 0 ? 'เกินกำหนด' : 'กำลังยืม',
}));

const selectedItem = {
  id: 'MC-01',
  name: 'ไมโครเวฟ',
  deposit: '500 บาท',
  borrower: 'สมชาย อยากกินไก่',
  borrowDate: '28/02/26 14:20',
  dueDate: '28/02/27',
  status: 'เกินกำหนด 2 วัน',
  condition: 'ปกติ',
};

export default function Borrow() {
  const [activeTab, setActiveTab] = useState<Tab>('การยืม');

  return (
    <Layout requiredRole="caretaker">
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-['Inter:Medium'] font-medium text-2xl text-black">ยืม / คืนของส่วนกลาง</span>
          <div className="flex border border-black">
            {(['การยืม', 'คลังของ', 'ประวัติ'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 h-9 font-['Inter:Regular'] font-normal text-base ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button className="border border-black px-4 h-[51px] font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
            เพิ่มของในคลัง
          </button>
          <button className="bg-black text-white px-4 h-[51px] font-['Inter:Bold'] font-bold text-base hover:bg-black/80">
            + บันทึกการยืม
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-black p-4 flex flex-col gap-2">
              <p className="font-['Inter:Regular'] font-normal text-sm text-black">{s.label}</p>
              <p className="font-['Inter:Bold'] font-bold text-3xl text-black">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table + detail */}
        <div className="flex gap-4">
          {/* Table */}
          <div className="bg-white border border-black flex-1">
            <div className="flex items-center justify-between px-5 py-3 border-b border-black">
              <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">รายการยืมของผู้พักอาศัย</span>
              <div className="flex border border-black">
                {['ทั้งหมด', 'เกินกำหนด'].map((f) => (
                  <button key={f} className="px-3 h-8 font-['Inter:Regular'] font-normal text-sm text-black border-r border-black last:border-r-0 hover:bg-gray-50">
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[80px_1fr_1fr_100px_100px_100px] bg-[#e9e9e9] border-b border-black px-4 py-2 gap-3">
              {['ID', 'ของที่ยืม', 'ผู้ยืม / ห้อง', 'วันที่ยืม', 'กำหนดคืน', 'สถานะ'].map((h) => (
                <span key={h} className="font-['Inter:Regular'] font-normal text-sm text-black">{h}</span>
              ))}
            </div>
            <div className="flex flex-col">
              {borrowItems.map((item, i) => (
                <div key={i} className="grid grid-cols-[80px_1fr_1fr_100px_100px_100px] px-4 py-3 gap-3 border-b border-black/10 hover:bg-gray-50 cursor-pointer">
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.id}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.item}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.borrower}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.borrowDate}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.dueDate}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="bg-white border border-black w-[280px] flex-shrink-0 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d9d9d9] rounded-full" />
              <div>
                <p className="font-['Inter:Semi Bold'] font-semibold text-sm text-black">{selectedItem.name}</p>
                <p className="font-['Inter:Regular'] font-normal text-xs text-black">{selectedItem.id} · มัดจำ {selectedItem.deposit}</p>
              </div>
            </div>
            {[
              ['ผู้ยืม', selectedItem.borrower],
              ['วันที่ยืม', selectedItem.borrowDate],
              ['กำหนดคืน', selectedItem.dueDate],
              ['สถานะ', selectedItem.status],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-black/10 pb-2">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{label}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{value}</span>
              </div>
            ))}

            <p className="font-['Inter:Regular'] font-normal text-sm text-black mt-2">สภาพของที่คืน</p>
            <div className="flex gap-2">
              {['ปกติ', 'ชำรุด', 'สูญหาย'].map((c) => (
                <button key={c} className={`flex-1 h-8 border border-black font-['Inter:Regular'] font-normal text-xs text-black hover:bg-gray-50 ${c === 'ปกติ' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <button className="w-full border border-black h-[51px] font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
                ค่าปรับ 200 บาท
              </button>
              <button className="w-full bg-black text-white h-[51px] font-['Inter:Bold'] font-bold text-base hover:bg-black/80">
                ยืนยันรับคืนของ
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

