import { useState } from 'react';
import Layout from '../../components/Layout';

interface CompletedJob {
  id: number;
  datetime: string;
  floor: number;
  room: string;
  type: string;
  detail: string;
  phone: string;
  fullDetail: string;
  equipment: string;
  cost: string;
  repairDetail: string;
}

const historyJobs: CompletedJob[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  datetime: '15/06/67 15:00',
  floor: 1,
  room: '102',
  type: 'สุขภัณฑ์',
  detail: 'โถส้วมเต็ม',
  phone: '06x-xxxxxxxx',
  fullDetail: 'โถส้วมเต็มค่ะ กดน้ำไม่ลง At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus',
  equipment: 'ลูกยางฝาชัก',
  cost: '120',
  repairDetail: 'เปลี่ยนลูกยางฝาชักและปรับระบบน้ำใหม่',
}));

interface DetailViewProps {
  job: CompletedJob;
  onBack: () => void;
}

function DetailView({ job, onBack }: DetailViewProps) {
  return (
    <Layout requiredRole="repairman">
      <div className="bg-white border-b border-black flex items-center gap-4 px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">งานซ่อม</span>
        <span className="font-['Inter:Regular'] font-normal text-base text-black">20 Request remaining</span>
      </div>

      <div className="p-5 flex flex-col gap-5">
        <button onClick={onBack} className="flex items-center gap-1 text-black hover:underline w-fit">
          <span className="text-xl">←</span>
        </button>

        {/* Row table */}
        <div className="border border-black">
          <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[2fr_60px_80px_1fr_1fr_100px] px-4 py-2 gap-3">
            {['วันที่นัดหมายและเวลา', 'ชั้น', 'เลขห้อง', 'ประเภทงานซ่อม', 'รายละเอียด', 'สถานะ'].map(h => (
              <span key={h} className="font-['Inter:Regular'] font-normal text-sm text-black">{h}</span>
            ))}
          </div>
          <div className="grid grid-cols-[2fr_60px_80px_1fr_1fr_100px] px-4 py-3 gap-3">
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.datetime}</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.floor}</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.room}</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.type}</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.detail}</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">ซ่อมแล้ว</span>
          </div>
        </div>

        {/* Request details */}
        <div className="bg-white border border-black p-5 flex flex-col gap-4">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">รายละเอียดคำขอ</span>
          <p className="font-['Inter:Regular'] font-normal text-sm text-black">
            <span className="font-['Inter:Semi Bold'] font-semibold">เบอร์ติดต่อเจ้าของห้อง :</span> {job.phone}
          </p>
          <p className="font-['Inter:Regular'] font-normal text-sm text-black leading-relaxed">
            <span className="font-['Inter:Semi Bold'] font-semibold">รายละเอียด :</span> {job.fullDetail}
          </p>
          <div>
            <p className="font-['Inter:Regular'] font-normal text-sm text-black mb-2">รูภาพ :</p>
            <div className="bg-[#d9d9d9] w-[340px] h-[160px]" />
          </div>
        </div>

        {/* Repair detail — read-only for completed */}
        <div className="bg-white border border-black p-5 flex flex-col gap-4">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">รายละเอียดการซ่อมแซม</span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="font-['Inter:Regular'] font-normal text-sm text-black whitespace-nowrap">อุปกรณ์ที่เบิก</label>
              <input
                type="text"
                value={job.equipment}
                disabled
                className="border border-black px-3 h-9 w-40 font-['Inter:Regular'] font-normal text-sm text-black outline-none bg-[#f5f5f5]"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="font-['Inter:Regular'] font-normal text-sm text-black">มูลค่า</label>
              <div className="bg-[#d9d9d9] w-24 h-9 flex items-center px-3">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.cost}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-['Inter:Regular'] font-normal text-sm text-black">รายละเอียดที่ซ่อม</label>
            <input
              type="text"
              value={job.repairDetail}
              disabled
              className="border border-black px-3 h-9 w-full font-['Inter:Regular'] font-normal text-sm text-black outline-none bg-[#f5f5f5]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function RepairmanHistory() {
  const [detailId, setDetailId] = useState<number | null>(null);

  const detailJob = detailId !== null ? historyJobs.find(j => j.id === detailId) : null;

  if (detailJob) {
    return <DetailView job={detailJob} onBack={() => setDetailId(null)} />;
  }

  return (
    <Layout requiredRole="repairman">
      <div className="bg-white border-b border-black flex items-center gap-4 px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">งานซ่อม</span>
        <span className="font-['Inter:Regular'] font-normal text-base text-black">20 Request remaining</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Sort buttons */}
        <div className="flex gap-3 justify-end">
          {['sort', 'sort', 'sort'].map((label, i) => (
            <button key={i} className="bg-white border border-black h-[49px] px-4 flex items-center gap-2 font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {label}
            </button>
          ))}
        </div>

        {/* Table — no checkboxes, status ซ่อมแล้ว */}
        <div className="bg-white border border-black">
          <div className="bg-[#e9e9e9] border-b border-black grid grid-cols-[2fr_60px_80px_1fr_1fr_100px] px-4 py-2 gap-3">
            {['วันที่นัดหมายและเวลา', 'ชั้น', 'เลขห้อง', 'ประเภทงานซ่อม', 'รายละเอียด', 'สถานะ'].map(h => (
              <span key={h} className="font-['Inter:Regular'] font-normal text-sm text-black">{h}</span>
            ))}
          </div>
          <div className="flex flex-col">
            {historyJobs.map((job) => (
              <div
                key={job.id}
                className="grid grid-cols-[2fr_60px_80px_1fr_1fr_100px] px-4 py-3 gap-3 border-b border-black/10 hover:bg-gray-50 cursor-pointer"
                onClick={() => setDetailId(job.id)}
              >
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.datetime}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.floor}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.room}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.type}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{job.detail}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">ซ่อมแล้ว</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
