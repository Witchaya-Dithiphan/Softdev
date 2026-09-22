import { useState } from 'react';
import Layout from '../../components/Layout';

const criticalItems = [
  { id: 1, title: 'ไฟในอาคารขั้นหนึ่ง', status: 'รอการช่วยเหลือ' },
  { id: 2, title: 'ไฟฟ้าลัดวงจร', status: 'รอการช่วยเหลือ' },
  { id: 3, title: 'ลื่นล้มหัวแตกในห้องน้ำ', status: 'รอการช่วยเหลือ' },
];

const urgentItems = [
  { id: 1, title: 'ช่วยจับจิ้งจก', status: 'รอการช่วยเหลือ' },
  { id: 2, title: 'ติดในห้องน้ำ', status: 'รอการช่วยเหลือ' },
];

export default function TenantSOS() {
  const [desc, setDesc] = useState('');

  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">SOS</span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* Critical SOS */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">Critical SOS</span>
          {criticalItems.map((item) => (
            <div key={item.id} className="bg-[#e9e9e9] flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{item.title}</span>
              </div>
              <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.status}</span>
            </div>
          ))}
        </div>

        {/* Urgent Assistant */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">Urgent Assistant</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">สถานะ</span>
          </div>
          {urgentItems.map((item) => (
            <div key={item.id} className="bg-[#e9e9e9] flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400 flex-shrink-0" />
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{item.title}</span>
              </div>
              <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.status}</span>
            </div>
          ))}
        </div>

        {/* Help request form */}
        <div className="bg-white border border-black p-5 flex flex-col gap-4">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ต้องการความช่วยเหลือ?</span>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
            placeholder="อธิบายสถานการณ์..."
            className="border border-black p-3 font-['Inter:Regular'] font-normal text-base text-black outline-none resize-none bg-[#e9e9e9]"
          />
          <div className="flex justify-end">
            <button className="bg-[#d9d9d9] border border-black px-6 h-[51px] font-['Inter:Regular'] font-normal text-base text-black hover:bg-[#c9c9c9]">
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
