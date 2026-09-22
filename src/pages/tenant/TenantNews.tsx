import Layout from '../../components/Layout';

const newsItems = [
  { id: 1, title: 'ปิดปรับปรุงระบบน้ำ วันที่ 5 สิงหาคม 2026', date: '01/08/26' },
  { id: 2, title: 'กิจกรรมทำความสะอาดหอพักประจำเดือน', date: '28/07/26' },
  { id: 3, title: 'ประกาศปรับราคาค่าไฟประจำปี 2026', date: '01/07/26' },
  { id: 4, title: 'แจ้งกำหนดการตรวจห้องพักประจำไตรมาส', date: '15/06/26' },
];

export default function TenantNews() {
  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">News</span>
      </div>

      <div className="p-5">
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ประกาศข่าวสาร</span>
          {newsItems.map((n) => (
            <div key={n.id} className="bg-[#e9e9e9] flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-[#ddd]">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{n.title}</span>
              <span className="font-['Inter:Regular'] font-normal text-sm text-black flex-shrink-0 ml-6">{n.date}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
