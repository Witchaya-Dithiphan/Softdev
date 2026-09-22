import { useState } from 'react';
import Layout from '../../components/Layout';

const history = Array.from({ length: 6 }, (_, i) => ({
  period: 1,
  month: 'มกราคม 2026',
  water: 150,
  electricity: 1200,
  total: 6300,
  status: 'ชำระเงินแล้ว',
}));

export default function TenantPaymentHistory() {
  const [search, setSearch] = useState('');

  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">ประวัติการชำระเงิน</span>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {/* Search & sort */}
        <div className="flex gap-3">
          <div className="bg-white border border-black flex items-center gap-3 h-[49px] px-4 flex-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="black" strokeWidth="1.5" />
              <path d="M14 14L18 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาเลขห้อง / ชื่อผู้พักอาศัย"
              className="w-full font-['Inter:Regular'] font-normal text-base text-black outline-none bg-transparent"
            />
          </div>
          {['sort', 'sort', 'sort'].map((label, i) => (
            <button key={i} className="bg-white border border-black h-[49px] px-4 flex items-center gap-2 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-black">
          <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[80px_1fr_80px_80px_100px_120px] h-[54px] items-center px-5 gap-4">
            {['งวด', 'เดือน', 'ค่าน้ำ', 'ค่าไฟ', 'รวมยอด', 'สถานะ'].map((col) => (
              <span key={col} className="font-['Inter:Regular'] font-normal text-base text-black">{col}</span>
            ))}
          </div>
          <div className="flex flex-col gap-3 p-5">
            {history.map((row, i) => (
              <div key={i} className="grid grid-cols-[80px_1fr_80px_80px_100px_120px] items-center gap-4">
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{row.period}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{row.month}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{row.water}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{row.electricity.toLocaleString()}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{row.total.toLocaleString()}</span>
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
