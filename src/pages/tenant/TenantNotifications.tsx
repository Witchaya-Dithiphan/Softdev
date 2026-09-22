import Layout from '../../components/Layout';

const notifications = [
  {
    id: 1,
    title: 'ใกล้ถึงวันกำหนดชำระค่าหอ',
    body: 'โปรดชำระค่าหอจำนวน 4,000 บาท ก่อนวันที่ 12 สิงหาคม 2569',
    timeAgo: '20 นาทีที่แล้ว',
    read: false,
  },
  {
    id: 2,
    title: 'คำร้องขอแจ้งซ่อม',
    body: 'คำร้องขอแจ้งซ่อมของคุณได้รับการอนุมัติแล้ว ช่างจะเข้าไปซ่อมในวันที่...',
    timeAgo: '1 ชั่วโมงที่แล้ว',
    read: false,
  },
  {
    id: 3,
    title: 'เกิดไฟไหม้',
    body: 'เกิดไฟไหม้ที่ดีก A โปรดอย่าเข้าใกล้บริเวณนั้น',
    timeAgo: '2 ชั่วโมงที่แล้ว',
    read: false,
  },
];

const unreadCount = notifications.filter(n => !n.read).length;

export default function TenantNotifications() {
  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">การแจ้งเตือน</span>
        {unreadCount > 0 && (
          <span className="font-['Inter:Regular'] font-normal text-sm text-black">
            {unreadCount} การแจ้งเตือนใหม่
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="bg-white border border-black flex flex-col gap-0">
          {notifications.map((n, i) => (
            <div
              key={n.id}
              className={`flex flex-col gap-1 px-5 py-4 ${i < notifications.length - 1 ? 'border-b border-black/10' : ''} bg-[#e9e9e9] mb-3`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">{n.title}</span>
                <span className="font-['Inter:Regular'] font-normal text-xs text-black flex-shrink-0">{n.timeAgo}</span>
              </div>
              <p className="font-['Inter:Regular'] font-normal text-sm text-black">{n.body}</p>
            </div>
          ))}
          {/* Empty placeholder row */}
          <div className="bg-[#e9e9e9] h-14" />
        </div>
      </div>
    </Layout>
  );
}
