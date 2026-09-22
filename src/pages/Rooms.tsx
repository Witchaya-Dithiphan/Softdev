import { useState } from 'react';
import Layout from '../components/Layout';

const assetPathPrefix = '/assets';
const imgSearch = `${assetPathPrefix}/1c2c0.svg`;
const imgSort = `${assetPathPrefix}/a977f.svg`;
const imgCheckbox = `${assetPathPrefix}/55085.svg`;

const rooms = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  floor: 1,
  number: 101 + i,
  type: 'เดี่ยว',
  tenant: 'สมหมาย อยากกินไก่',
  rent: '6,500',
  status: i % 3 === 0 ? 'ว่าง' : i % 5 === 0 ? 'ค้างชำระ' : 'มีผู้เช่า',
}));

export default function Rooms() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = rooms.filter(r =>
    String(r.number).includes(search) || r.tenant.includes(search)
  );

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Layout requiredRole="caretaker">
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <div className="flex items-center gap-7">
          <span className="font-['Inter:Medium'] font-medium text-2xl text-black">จัดการห้องพัก</span>
          <span className="font-['Inter:Regular'] font-normal text-base text-black">20 Rooms</span>
        </div>
        <button className="bg-black h-[51px] px-6 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80 transition-colors">
          + เพิ่มห้องพัก
        </button>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 px-5 py-4 bg-[#d9d9d9]">
        <div className="bg-white border border-black flex gap-4 items-center h-[49px] px-5 flex-1">
          <img src={imgSearch} alt="" className="w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาเลขห้อง / ชื่อผู้พักอาศัย"
            className="w-full font-['Inter:Regular'] font-normal text-base text-black outline-none bg-transparent"
          />
        </div>
        {['sort', 'sort', 'sort'].map((_, i) => (
          <div key={i} className="bg-white border border-black flex gap-3 items-center justify-center h-[49px] px-5 w-[111px]">
            <img src={imgSort} alt="" className="w-6 h-6" />
            <span className="font-['Inter:Regular'] font-normal text-base text-black">sort</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="mx-5 mb-5 bg-white border border-black flex-1 overflow-auto">
        {/* Table header */}
        <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[48px_1fr_1fr_1fr_2fr_1fr_1fr] h-[54px] items-center px-5 gap-4">
          <div />
          {['ชั้น', 'เลขห้อง', 'ประเภท', 'ชื่อผู้พักอาศัย', 'ค่าเช่า', 'สถานะ'].map(col => (
            <span key={col} className="font-['Inter:Regular'] font-normal text-base text-black">{col}</span>
          ))}
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-4 p-5">
          {filtered.map((room) => (
            <div key={room.id} className="grid grid-cols-[48px_1fr_1fr_1fr_2fr_1fr_1fr] items-center gap-4">
              <button onClick={() => toggleSelect(room.id)}>
                <img src={imgCheckbox} alt="" className="w-6 h-6" style={{ opacity: selected.has(room.id) ? 1 : 0.5 }} />
              </button>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{room.floor}</span>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{room.number}</span>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{room.type}</span>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{room.tenant}</span>
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{room.rent}</span>
              <span className={`font-['Inter:Regular'] font-normal text-base ${room.status === 'ว่าง' ? 'text-green-600' : room.status === 'ค้างชำระ' ? 'text-red-500' : 'text-black'}`}>{room.status}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
