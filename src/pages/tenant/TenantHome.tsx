import Layout from '../../components/Layout';

const sosItems = [
  { label: 'ไฟในอาคารขั้นหนึ่ง', status: 'รอการช่วยเหลือ' },
];

const notifications = [
  { message: 'กรุณาชำระค่าห้องพักภายในวันที่ 5 ของทุกเดือน', date: '01/08/26' },
];

const repairRequests = [
  { title: 'ก๊อกน้ำในห้องน้ำรั่ว', status: 'รอดำเนินการ' },
  { title: 'แอร์ไม่เย็น', status: 'กำลังดำเนินการ' },
];

export default function TenantHome() {
  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">หน้าแรก</span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* SOS board */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">บอร์ด SOS</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">สถานะ</span>
          </div>
          {sosItems.map((item, i) => (
            <div key={i} className="bg-[#e9e9e9] flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="font-['Inter:Regular'] font-normal text-base text-black">{item.label}</span>
              </div>
              <span className="font-['Inter:Regular'] font-normal text-sm text-black">{item.status}</span>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">แจ้งเตือนข่าวสาร</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">วันที่แจ้ง</span>
          </div>
          {notifications.map((n, i) => (
            <div key={i} className="bg-[#e9e9e9] px-4 py-3">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{n.message}</span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-5">
          {/* Monthly fee */}
          <div className="bg-white border border-black p-5 flex flex-col gap-4">
            <div>
              <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ค่าหอประจำเดือน: สิงหาคม</span>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mt-1">ครบกำหนดชำระใน 1:10:46</p>
            </div>
            <div className="bg-[#e9e9e9] h-12 flex items-center justify-center">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">6,800 บาท</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าน้ำ</p>
                <div className="bg-[#d9d9d9] h-10" />
              </div>
              <div>
                <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าไฟ</p>
                <div className="bg-[#d9d9d9] h-10" />
              </div>
            </div>
          </div>

          {/* Real-time meter */}
          <div className="bg-white border border-black p-5 flex flex-col gap-4">
            <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ค่าน้ำค่าไฟรายชั่วโมง</span>
            <div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าน้ำ</p>
              <div className="bg-[#d9d9d9] h-10" />
            </div>
            <div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">ค่าไฟ</p>
              <div className="bg-[#d9d9d9] h-10" />
            </div>
          </div>
        </div>

        {/* Repair requests */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">คำขอแจ้งซ่อมของฉัน</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">สถานะ</span>
          </div>
          {repairRequests.map((r, i) => (
            <div key={i} className="bg-[#e9e9e9] px-4 py-3">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{r.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
