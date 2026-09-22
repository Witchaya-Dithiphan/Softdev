import { useEffect, useRef, useState, type FormEvent } from 'react';
import Layout from '../../components/Layout';

interface Repair {
  id: number;
  title: string;
  status: string;
  room?: string;
  photo?: File;
}

function PhotoPreview({ file }: { file: File }) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);
  return <img src={url || undefined} alt={`รูปประกอบปัญหา: ${file.name}`} className="max-h-48 max-w-full border border-black/20 object-contain" />;
}

const initialRepairs: Repair[] = [
  { id: 1, title: 'ก๊อกน้ำในห้องน้ำรั่ว', status: 'รอดำเนินการ' },
  { id: 2, title: 'แอร์ไม่เย็น', status: 'กำลังดำเนินการ' },
];

const repairHistory = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: 'หลอดไฟในห้องน้ำขาด',
  date: '15/07/26',
  status: 'เสร็จสิ้น',
}));

export default function TenantRepair() {
  const [showForm, setShowForm] = useState(false);
  const [desc, setDesc] = useState('');
  const [room, setRoom] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState('');
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [myRepairs, setMyRepairs] = useState(initialRepairs);
  const photoInput = useRef<HTMLInputElement>(null);

  function resetForm() {
    setDesc('');
    setRoom('');
    setPhoto(null);
    setPhotoError('');
    setFormError('');
    setShowForm(false);
  }

  function submitRepair(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!room.trim() || !desc.trim()) {
      setFormError('กรุณาระบุหมายเลขห้องและรายละเอียดปัญหา');
      event.currentTarget.querySelector<HTMLElement>(!room.trim() ? '#repair-room' : '#repair-description')?.focus();
      return;
    }
    if (photoError) return;
    setMyRepairs((current) => [{ id: Date.now(), title: desc.trim(), room: room.trim(), photo: photo ?? undefined, status: 'รอดำเนินการ' }, ...current]);
    resetForm();
    setNotice('เพิ่มคำขอในหน้าตัวอย่างแล้ว ข้อมูลอยู่เฉพาะหน้านี้ ยังไม่ได้ส่งให้ช่าง');
  }

  return (
    <Layout requiredRole="tenant">
      <div className="bg-white border-b border-black flex items-center justify-between px-5 h-[82px] flex-shrink-0">
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black">แจ้งซ่อม</span>
        <button
          onClick={() => setShowForm(!showForm)}
          aria-expanded={showForm}
          aria-controls="repair-form"
          className="bg-black text-white px-6 h-[51px] font-['Inter:Bold'] font-bold text-base hover:bg-black/80"
        >
          + แจ้งซ่อมใหม่
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {notice && <p role="status" className="border border-black bg-[#e9e9e9] p-4 text-sm">{notice}</p>}
        {showForm && (
          <form id="repair-form" onSubmit={submitRepair} className="bg-white border border-black p-5 flex flex-col gap-4">
            <p className="font-['Inter:Semi Bold'] font-semibold text-base text-black">แจ้งซ่อมใหม่</p>
            <div className="flex flex-col gap-2">
              <label htmlFor="repair-room" className="font-['Inter:Regular'] font-normal text-sm text-black">หมายเลขห้อง <span aria-hidden="true">*</span></label>
              <input id="repair-room" value={room} onChange={(event) => { setRoom(event.target.value); setFormError(''); }} required maxLength={30} placeholder="เช่น 101" className="h-[51px] w-full border border-black px-3 text-base focus:outline-2 focus:outline-offset-2 focus:outline-black sm:max-w-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="repair-photo" className="font-['Inter:Regular'] font-normal text-sm text-black">แนบรูปประกอบ (ไม่บังคับ)</label>
              <input ref={photoInput} id="repair-photo" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="repair-photo-hint repair-photo-error" aria-invalid={Boolean(photoError)} onChange={(event) => {
                const file = event.target.files?.[0];
                setPhoto(null);
                setPhotoError('');
                if (!file) return;
                if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
                  setPhotoError('กรุณาเลือกรูป JPG, PNG หรือ WebP ขนาดไม่เกิน 5 MB');
                  event.target.value = '';
                  return;
                }
                setPhoto(file);
              }} className="w-full border border-black p-3 text-sm file:mr-3 file:cursor-pointer file:border-0 file:bg-[#e9e9e9] file:px-4 file:py-2 file:text-black" />
              <p id="repair-photo-hint" className="text-xs text-black/60">แนบได้ 1 รูป รองรับ JPG, PNG และ WebP ขนาดไม่เกิน 5 MB</p>
              <p id="repair-photo-error" role="alert" className="text-xs text-red-600">{photoError}</p>
              {photo && <div className="flex flex-col items-start gap-2">
                <PhotoPreview file={photo} />
                <button type="button" onClick={() => { setPhoto(null); if (photoInput.current) photoInput.current.value = ''; }} className="border border-black px-4 py-2 text-sm hover:bg-[#e9e9e9]">ลบรูป</button>
              </div>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="repair-description" className="font-['Inter:Regular'] font-normal text-sm text-black">รายละเอียดปัญหา <span aria-hidden="true">*</span></label>
              <textarea
                id="repair-description"
                required
                maxLength={2000}
                value={desc}
                onChange={(e) => { setDesc(e.target.value); setFormError(''); }}
                rows={4}
                placeholder="อธิบายปัญหาที่พบ..."
                className="border border-black p-3 font-['Inter:Regular'] font-normal text-base text-black focus:outline-2 focus:outline-offset-2 focus:outline-black resize-y"
              />
            </div>
            {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={resetForm} className="border border-black px-6 h-[51px] font-['Inter:Regular'] font-normal text-base text-black hover:bg-gray-50">
                ยกเลิก
              </button>
              <button type="submit" className="bg-black text-white px-6 h-[51px] font-['Inter:Bold'] font-bold text-base hover:bg-black/80">
                ส่งคำขอ
              </button>
            </div>
          </form>
        )}

        {/* My repairs */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">คำขอแจ้งซ่อมของฉัน ({myRepairs.length})</span>
            <span className="font-['Inter:Regular'] font-normal text-sm text-black">สถานะ</span>
          </div>
          {myRepairs.map((r) => (
            <div key={r.id} className="bg-[#e9e9e9] flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex flex-col gap-2">
                {r.room && <p className="text-sm font-medium">ห้อง {r.room}</p>}
                <span className="font-['Inter:Regular'] font-normal text-base text-black whitespace-pre-wrap break-words">{r.title}</span>
                {r.photo && <PhotoPreview file={r.photo} />}
              </div>
              <span className="shrink-0 font-['Inter:Regular'] font-normal text-sm text-black">{r.status}</span>
            </div>
          ))}
        </div>

        {/* Repair history */}
        <div className="bg-white border border-black p-5 flex flex-col gap-3">
          <span className="font-['Inter:Semi Bold'] font-semibold text-base text-black">ประวัติการซ่อม</span>
          {repairHistory.map((r) => (
            <div key={r.id} className="bg-[#e9e9e9] flex items-center justify-between px-4 py-3">
              <span className="font-['Inter:Regular'] font-normal text-base text-black">{r.title}</span>
              <div className="flex items-center gap-4">
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{r.date}</span>
                <span className="font-['Inter:Regular'] font-normal text-sm text-black">{r.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
