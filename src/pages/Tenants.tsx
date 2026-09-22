import { useState } from 'react';
import Layout from '../components/Layout';

const assetPathPrefix = '/assets';
const imgSearch = `${assetPathPrefix}/1c2c0.svg`;
const imgSort = `${assetPathPrefix}/a977f.svg`;

const tenants = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: 'สมหมาย อยากกินไก่',
  room: 607,
  phone: 'เบอร์โทร',
  moveIn: 'วันที่เข้าพัก',
  contractEnd: 'วันหมดสัญญา',
}));

interface TenantDetail {
  name: string;
  room: number;
  idCard: string;
  phone: string;
  emergency: string;
  emergencyPhone: string;
  moveIn: string;
  contractEnd: string;
  deposit: number;
}

const selectedTenantDetail: TenantDetail = {
  name: 'สมหมาย อยากกินไก่',
  room: 607,
  idCard: '1234567891234',
  phone: '0892222222',
  emergency: 'แนบรัก สุขคำไว',
  emergencyPhone: '0892222222',
  moveIn: '12 มกราคม 2345',
  contractEnd: '12 มกราคม 2345',
  deposit: 12000,
};

export default function Tenants() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const filtered = tenants.filter(t =>
    t.name.includes(search) || String(t.room).includes(search)
  );

  return (
    <Layout requiredRole="caretaker">
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <div className="flex items-center gap-7">
          <span className="font-['Inter:Medium'] font-medium text-2xl text-black">ข้อมูลผู้พักอาศัย</span>
          <span className="font-['Inter:Regular'] font-normal text-base text-black">70 people</span>
        </div>
        <button className="bg-black h-[51px] px-6 font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80 transition-colors">
          + เพิ่มผู้อยู่อาศัย
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 gap-0">
        {/* Left: list */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Search */}
          <div className="flex gap-3 px-5 py-4 bg-[#d9d9d9]">
            <div className="bg-white border border-black flex gap-4 items-center h-[49px] px-5 flex-1">
              <img src={imgSearch} alt="" className="w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาชื่อ / เบอร์โทร / ห้อง"
                className="w-full font-['Inter:Regular'] font-normal text-base text-black outline-none bg-transparent"
              />
            </div>
            <div className="bg-white border border-black flex gap-3 items-center justify-center h-[49px] px-5 w-[111px]">
              <img src={imgSort} alt="" className="w-6 h-6" />
              <span className="font-['Inter:Regular'] font-normal text-base text-black">sort</span>
            </div>
          </div>

          {/* Table */}
          <div className="mx-5 mb-5 bg-white border border-black overflow-auto">
            <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[2fr_1fr_1fr_1fr_1fr] h-[54px] items-center px-5 gap-4">
              {['ชื่อ – นามสกุล', 'เลขห้อง', 'เบอร์โทร', 'วันที่เข้าพัก', 'วันหมดสัญญา'].map(col => (
                <span key={col} className="font-['Inter:Regular'] font-normal text-base text-black">{col}</span>
              ))}
            </div>
            <div className="flex flex-col gap-3 p-5">
              {filtered.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => setSelectedId(tenant.id)}
                  className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4 text-left w-full p-1 rounded ${selectedId === tenant.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <span className="font-['Inter:Regular'] font-normal text-base text-black">{tenant.name}</span>
                  <span className="font-['Inter:Regular'] font-normal text-base text-black">{tenant.room}</span>
                  <span className="font-['Inter:Regular'] font-normal text-base text-black">{tenant.phone}</span>
                  <span className="font-['Inter:Regular'] font-normal text-base text-black">{tenant.moveIn}</span>
                  <span className="font-['Inter:Regular'] font-normal text-base text-black">{tenant.contractEnd}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: detail panel */}
        {selectedId && (
          <div className="w-[302px] flex-shrink-0 bg-white border-l border-black flex flex-col p-5 gap-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#d9d9d9] rounded-full flex-shrink-0" />
              <div>
                <p className="font-['Inter:Semi Bold'] font-semibold text-lg text-black">{selectedTenantDetail.name}</p>
                <p className="font-['Inter:Regular'] font-normal text-sm text-black">ห้อง {selectedTenantDetail.room}</p>
              </div>
            </div>

            {/* Detail rows */}
            {[
              ['เลขบัตรประชาชน', selectedTenantDetail.idCard],
              ['เบอร์โทร', selectedTenantDetail.phone],
              ['ผู้ติดต่อฉุกเฉิน', selectedTenantDetail.emergency],
              ['เบอร์ผู้ติดต่อฉุกเฉิน', selectedTenantDetail.emergencyPhone],
              ['วันที่เข้าพัก', selectedTenantDetail.moveIn],
              ['วันหมดสัญญา', selectedTenantDetail.contractEnd],
              ['เงินประกัน', String(selectedTenantDetail.deposit)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-start border-b border-gray-100 pb-2">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{label}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black text-right">{value}</span>
              </div>
            ))}

            {/* Documents */}
            <div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-3">เอกสารแนบ</p>
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-[80px] h-[64px] bg-[#d9d9d9]" />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3">
              <button className="w-full bg-black h-[51px] font-['Inter:Bold'] font-bold text-base text-white hover:bg-black/80">
                แก้ไขข้อมูล
              </button>
              <button className="w-full border border-black h-[51px] font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
                ย้ายออก / สิ้นสุดสัญญา
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
