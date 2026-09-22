import Layout from '../components/Layout';

const assetPathPrefix = '/assets';
const imgChart = `${assetPathPrefix}/db563.png`;
const imgDonut = `${assetPathPrefix}/dbd34.svg`;

const statCards = [
  { label: 'ห้องทั้งหมด', value: '67' },
  { label: 'ห้องว่าง', value: '3' },
  { label: 'ห้องที่มีผู้พัก', value: '64' },
  { label: 'ค้างชำระ', value: '3' },
];

const repairItems = [
  { room: '101', issue: 'แอร์ไม่เย็น', date: '20/09/26' },
  { room: '205', issue: 'น้ำรั่ว', date: '19/09/26' },
  { room: '310', issue: 'ไฟดับ', date: '18/09/26' },
  { room: '402', issue: 'ประตูพัง', date: '17/09/26' },
];

export default function Dashboard() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">Dashboard</span>
        <div className="flex items-center gap-3">
          <button className="border border-black h-[51px] px-6 font-['Inter:Medium'] font-medium text-base text-black">
            เดือนนี้
          </button>
          <button className="border border-black h-[51px] w-[54px]" />
          <button className="border border-black h-[51px] w-[54px] rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-[34px]">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white border border-black flex flex-col gap-5 justify-center px-5 h-[118px]">
              <span className="font-['Inter:Regular'] font-normal text-2xl text-black">{card.label}</span>
              <span className="font-['Inter:Medium'] font-medium text-[36px] text-black">{card.value}</span>
            </div>
          ))}
        </div>

        {/* Middle row */}
        <div className="flex gap-5">
          {/* Bar chart */}
          <div className="bg-white border border-black flex flex-col gap-5 px-5 py-7 flex-1">
            <span className="font-['Inter:Regular'] font-normal text-2xl text-black">การใช้ค่าน้ำค่าไฟ ย้อนหลัง 6 เดือน</span>
            <div className="flex-1 relative min-h-[240px]">
              <img src={imgChart} alt="bar chart" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          {/* Recent repairs */}
          <div className="bg-white border border-black flex flex-col gap-5 px-5 py-5 w-[466px] flex-shrink-0">
            <span className="font-['Inter:Regular'] font-normal text-xl text-black">แจ้งซ่อมล่าสุด</span>
            <div className="flex flex-col gap-3">
              {repairItems.map((item, i) => (
                <div key={i} className="bg-[#d9d9d9] h-[62px] flex items-center px-4 gap-4">
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black">ห้อง {item.room}</span>
                  <span className="font-['Inter:Regular'] font-normal text-sm text-black flex-1">{item.issue}</span>
                  <span className="font-['Inter:Regular'] font-normal text-xs text-black">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex gap-5">
          {/* Payment donut */}
          <div className="bg-white border border-black flex flex-col gap-5 p-5 w-[426px] flex-shrink-0">
            <span className="font-['Inter:Regular'] font-normal text-xl text-black">การชำระเงินของผู้พักอาศัย</span>
            <div className="flex items-center justify-between">
              <img src={imgDonut} alt="donut chart" className="w-[172px] h-[172px]" />
              <div className="flex flex-col justify-between h-[172px] font-['Inter:Regular'] font-normal text-xl text-black">
                <span>จ่ายแล้ว 45</span>
                <span>ยังไม่จ่าย 20</span>
                <span>ค้างชำระ 5</span>
              </div>
            </div>
          </div>

          {/* Placeholder panels */}
          <div className="bg-white border border-black flex-1 min-h-[299px]" />
          <div className="bg-white border border-black w-[314px] flex-shrink-0" />
        </div>
      </div>
    </Layout>
  );
}
