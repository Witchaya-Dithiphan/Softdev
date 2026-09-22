import { useRef, useState, type FormEvent } from 'react';
import Layout from '../../components/Layout';

const items = [
  { name: 'ไม้กวาด', available: false },
  { name: 'เครื่องปิ้งขนมปัง', available: true },
  { name: 'ไม้ถูพื้น', available: true },
  { name: 'โต๊ะรีดผ้า', available: true },
];
const initialLoans = Array.from({ length: 6 }, (_, index) => ({
  id: index, name: items[index % items.length].name, date: '2026-02-28', due: index < 2 ? '2026-03-07' : '2027-02-28', overdue: index < 2, returned: false,
}));
const returnedLoans = ['เตารีด', 'โต๊ะ', 'เก้าอี้', 'พัดลม'].map((name, index) => ({
  id: index + 6, name, date: '2026-02-28', due: '2026-03-07', overdue: false, returned: true,
}));
const formatDate = (value: string) => {
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year.slice(-2)}`;
};
function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function TenantBorrow() {
  const [tab, setTab] = useState('การยืม');
  const [loans, setLoans] = useState([...initialLoans, ...returnedLoans]);
  const [historyFilter, setHistoryFilter] = useState('ทั้งหมด');
  const [borrowed, setBorrowed] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [notice, setNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  function openForm(name = '') {
    setSelected(name);
    dialog.current?.showModal();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const due = String(new FormData(event.currentTarget).get('due'));
    if (!items.some((item) => item.name === selected && item.available) || borrowed.includes(selected) || due < today()) return;
    setLoans((current) => [{ id: Date.now(), name: selected, date: today(), due, overdue: false, returned: false }, ...current]);
    setBorrowed((current) => [...current, selected]);
    setNotice(`บันทึกการยืม${selected}ในหน้าตัวอย่างแล้ว ดูรายการได้ที่แท็บประวัติ`);
    dialog.current?.close();
    event.currentTarget.reset();
  }
  return (
    <Layout requiredRole="tenant">
      <header className="flex min-h-[82px] flex-wrap items-center justify-between gap-4 bg-white px-5 py-4 text-black">
        <div className="flex flex-wrap items-center gap-10">
          <h1 className="font-['Inter:Medium'] text-2xl font-medium">ยืม / คืนของส่วนกลาง</h1>
          <div className="flex border border-black" aria-label="เมนูยืมคืนของ">
            {['การยืม', 'ประวัติ'].map((value) => <button key={value} onClick={() => setTab(value)} aria-pressed={tab === value} className={`h-9 min-w-[86px] px-4 text-sm ${tab === value ? 'bg-black font-bold text-white' : 'bg-white text-black hover:bg-gray-50'}`}>{value}</button>)}
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-5 px-7 pb-12 pt-5 text-black lg:pr-14">
        {tab === 'การยืม' ? <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-2 lg:gap-11">
          <h2 className="pb-6 text-2xl font-semibold">การยืมของฉัน</h2>
          <div className="grid grid-cols-2 gap-5 lg:gap-10">
            {[{ label: 'กำลังยืม', value: loans.filter((loan) => !loan.returned).length }, { label: 'เกินกำหนดคืน', value: loans.filter((loan) => loan.overdue && !loan.returned).length }].map((stat) => (
              <div key={stat.label} className="flex min-h-[130px] flex-col justify-between gap-4 border border-black bg-white px-5 py-4">
                <p className="text-xl">{stat.label}</p><p className="text-[40px] leading-none">{stat.value}</p>
              </div>
            ))}
          </div>
        </div> : <h2 className="py-6 text-center text-2xl font-semibold">ประวัติการยืม/ คืนของฉัน</h2>}
        {notice && <p role="status" className="border border-black bg-white p-3 text-sm">{notice}</p>}
        {tab === 'การยืม' ? (
          <div className="grid grid-cols-1 gap-x-11 gap-y-6 lg:grid-cols-2">
            {items.map((item) => {
              const available = item.available && !borrowed.includes(item.name);
              return (
                <article key={item.name} className="border border-black bg-white p-5">
                  <div aria-hidden="true" className="aspect-[293/125] w-full bg-[#d9d9d9]" />
                  <div className="mt-7 flex flex-wrap items-center gap-3 px-1">
                    <h3 className="mr-auto text-2xl font-medium">{item.name}</h3>
                    <p className="text-sm">สถานะ: {available ? 'ว่าง' : 'ไม่ว่าง'}</p>
                    <button disabled={!available} onClick={() => openForm(item.name)} aria-label={`ยืม${item.name}`} className="ml-3 h-[51px] min-w-[98px] bg-[#d9d9d9] px-5 text-sm hover:bg-[#c0c0c0] disabled:cursor-not-allowed disabled:hover:bg-[#d9d9d9]">ยืม</button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="min-h-[700px] border border-black bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black px-7 py-4">
              <h3 className="text-base font-semibold">รายการยืมของฉัน</h3>
              <div className="flex gap-5" aria-label="กรองประวัติการยืม">
                {['ทั้งหมด', 'เกินกำหนด'].map((filter) => <button key={filter} onClick={() => setHistoryFilter(filter)} aria-pressed={historyFilter === filter} className={`h-9 border border-black px-5 text-sm ${historyFilter === filter ? 'bg-black font-bold text-white' : 'bg-white text-black hover:bg-[#e9e9e9]'}`}>{filter}</button>)}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-black bg-[#e9e9e9]"><tr>{['ID', 'ของที่ยืม', 'ผู้ยืม / ห้อง', 'วันที่ยืม', 'กำหนดคืน', 'สถานะ'].map((label) => <th key={label} scope="col" className="px-7 py-4 font-normal">{label}</th>)}</tr></thead>
                <tbody>{loans.filter((loan) => historyFilter === 'ทั้งหมด' || (loan.overdue && !loan.returned)).map((loan) => <tr key={loan.id} className="first:[&>td]:pt-6">
                  <td className="px-7 py-3">MC-{String(loan.id < 10 ? loan.id + 1 : loan.id).padStart(2, '0')}</td>
                  <td className="px-7 py-3">{loan.name}</td>
                  <td className="px-7 py-3 whitespace-nowrap">ผู้พักอาศัย - 1134</td>
                  <td className="px-7 py-3">{formatDate(loan.date)}</td>
                  <td className="px-7 py-3">{formatDate(loan.due)}</td>
                  <td className="px-7 py-3 whitespace-nowrap">{loan.returned ? 'คืนแล้ว' : loan.overdue ? 'เกินกำหนดคืน' : 'กำลังยืม'}</td>
                </tr>)}</tbody>
              </table>
              {!loans.some((loan) => historyFilter === 'ทั้งหมด' || (loan.overdue && !loan.returned)) && <p role="status" className="p-8 text-center text-sm text-black/60">ไม่มีรายการเกินกำหนดคืน</p>}
            </div>
          </div>
        )}
      </div>
      <dialog ref={dialog} aria-labelledby="borrow-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-lg overflow-y-auto border border-black bg-white p-6 text-black backdrop:bg-black/50">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="borrow-title" className="text-2xl font-semibold">บันทึกการยืม</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="ปิด" className="h-9 w-9 border border-black text-xl">×</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">ของที่ต้องการยืม
            <select required value={selected} onChange={(event) => setSelected(event.target.value)} className="h-[51px] border border-black bg-white px-3">
              <option value="" disabled>เลือกของที่ต้องการยืม</option>
              {items.map((item) => <option key={item.name} value={item.name} disabled={!item.available || borrowed.includes(item.name)}>{item.name}{!item.available || borrowed.includes(item.name) ? ' (ไม่ว่าง)' : ''}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2">กำหนดคืน
            <input name="due" type="date" required min={today()} className="h-[51px] border border-black px-3" />
          </label>
          <p className="text-xs text-black/60">บันทึกตัวอย่างในหน้านี้ ข้อมูลจะถูกรีเซ็ตเมื่อออกจากหน้า</p>
          <div className="mt-2 flex justify-end gap-3">
            <button type="button" onClick={() => dialog.current?.close()} className="h-[51px] border border-black px-5 hover:bg-[#e9e9e9]">ยกเลิก</button>
            <button type="submit" className="h-[51px] bg-black px-5 font-bold text-white hover:bg-black/80">ยืนยันการยืม</button>
          </div>
        </form>
      </dialog>
    </Layout>
  );
}
