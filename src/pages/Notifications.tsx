import { useState } from 'react';
import Layout from '../components/Layout';

const rooms = [
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'เกินกำหนด 3 วัน' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'เกินกำหนด 3 วัน' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'เกินกำหนด 2 วัน' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'เกินกำหนด 1 วัน' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'เกินกำหนด 1 วัน' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'เกินกำหนด 1 วัน' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ยังไม่ชำระ' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ยังไม่ชำระ' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ยังไม่ชำระ' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ยังไม่ชำระ' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ยังไม่ชำระ' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ยังไม่ชำระ' },
  { room: '607', tenant: 'สมชาย อยากกินไก่', amount: 6500, status: 'ซ่อมแอร์' },
];

export default function Notifications() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [title, setTitle] = useState('แจ้งยอดค่าเช่า / ค่าน้ำค่าไฟ เดือน ส.ค.');
  const [message, setMessage] = useState('แจ้งคุณสมชาย อยากกินไก่ ห้อง 607 คุณมียอดที่ต้องชำระเดือนนี้ จำนวน 6,500 บาท กำหนดชำระภายในวันที่ 32 สิงหาคม 2569 กรุณาชำระผ่านแอปเพื่อความสะดวก');
  const [sendTime, setSendTime] = useState('ส่งทันที');
  const [repeat, setRepeat] = useState('ทุก 3 วัน');

  const toggleSelect = (i: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rooms.map((_, i) => i)));
    }
    setSelectAll(!selectAll);
  };

  return (
    <Layout requiredRole="caretaker">
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">แจ้งเตือนผู้พักอาศัย</span>
        <button className="bg-black h-[51px] px-6 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
          + ส่งแจ้งเตือน
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 gap-0 p-5">
        {/* Left: room list */}
        <div className="bg-white border border-black flex-1 overflow-auto">
          {/* List header */}
          <div className="bg-[#e9e9e9] border-b border-black flex items-center justify-between px-5 h-[54px]">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">เลือกห้องที่จะแจ้งเตือน</span>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="w-3 h-3 border border-black" />
              <span className="font-['Inter:Regular'] font-normal text-base text-black">เลือกทั้งหมด ({selected.size})</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-5">
            {rooms.map((room, i) => (
              <div key={i} className="flex items-center gap-5">
                <input
                  type="checkbox"
                  checked={selected.has(i)}
                  onChange={() => toggleSelect(i)}
                  className="w-3 h-3 border border-black flex-shrink-0"
                />
                <span className="font-['Inter:Regular'] font-normal text-base text-black w-12">{room.room}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black flex-1">{room.tenant}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black w-20 text-right">{room.amount.toLocaleString()}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black w-32 text-right">{room.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: compose panel */}
        <div className="w-[302px] flex-shrink-0 bg-white border border-black border-l-0 flex flex-col gap-4 p-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">หัวข้อ</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-black px-3 py-2 font-['Inter:Regular'] font-normal text-sm text-black outline-none"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-['Inter:Regular'] font-normal text-base text-black">ข้อความ</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-black px-3 py-2 font-['Inter:Regular'] font-normal text-sm text-black outline-none flex-1 resize-none min-h-[160px]"
            />
          </div>

          {/* Send time + repeat */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-['Inter:Regular'] font-normal text-sm text-black">กำหนดเวลาส่ง</span>
              <div className="border border-black px-3 py-2 flex items-center justify-between">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{sendTime}</span>
                <span className="text-sm">▾</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-['Inter:Regular'] font-normal text-sm text-black">แจ้งเตือนซ้ำหากไม่ชำระ</span>
              <div className="border border-black px-3 py-2 flex items-center justify-between">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{repeat}</span>
                <span className="text-sm">▾</span>
              </div>
            </div>
          </div>

          {/* Send button */}
          <button className="w-full bg-black h-[51px] font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
            ส่งแจ้งเตือน
          </button>
        </div>
      </div>
    </Layout>
  );
}
