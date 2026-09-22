import { useEffect, useRef, useState, type FormEvent } from 'react';

interface Props {
  initialEmail: string;
  onClose: () => void;
}

export default function ForgotPasswordDialog({ initialEmail, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [channel, setChannel] = useState<'email' | 'sms'>('email');
  const [contact, setContact] = useState(initialEmail);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    if (submitted) heading.current?.focus();
  }, [submitted]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = contact.trim();
    const valid = channel === 'email'
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : /^(?:0\d{9}|\+66\d{9})$/.test(value.replace(/[\s()-]/g, ''));
    if (!valid) {
      setError(channel === 'email' ? 'กรุณากรอกอีเมลให้ถูกต้อง' : 'กรุณากรอกหมายเลขโทรศัพท์มือถือให้ถูกต้อง');
      event.currentTarget.querySelector<HTMLInputElement>('input[name="contact"]')?.focus();
      return;
    }
    setContact(value);
    setError('');
    setSubmitted(true);
  }

  return (
    <dialog ref={dialog} onCancel={(event) => { event.preventDefault(); onClose(); }} aria-labelledby="forgot-title" aria-describedby="forgot-description" className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[480px] overflow-y-auto border border-black bg-white p-6 text-black backdrop:bg-black/50 sm:p-8">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 ref={heading} tabIndex={-1} id="forgot-title" className="font-['Inter:Semi_Bold'] text-2xl font-semibold focus:outline-none">{submitted ? (channel === 'email' ? 'เปลี่ยนรหัสผ่านทางอีเมล' : 'เปลี่ยนรหัสผ่านทาง SMS') : 'ลืมรหัสผ่าน'}</h2>
        <button type="button" onClick={onClose} aria-label="ปิดหน้าลืมรหัสผ่าน" className="flex h-8 w-8 shrink-0 items-center justify-center border border-black text-xl hover:bg-[#e9e9e9]">×</button>
      </div>
      {submitted ? (
        <div>
          <p id="forgot-description" className="text-sm leading-7">{channel === 'email' ? 'เปิดอีเมลของคุณ แล้วกดลิงก์ในข้อความเพื่อกำหนดรหัสผ่านใหม่' : 'เปิดข้อความ SMS ในโทรศัพท์ของคุณ แล้วกดลิงก์ในข้อความเพื่อกำหนดรหัสผ่านใหม่'}</p>
          <div className="my-5 border border-black bg-[#e9e9e9] p-4">
            <p className="mb-1 text-xs text-black/60">{channel === 'email' ? 'อีเมลที่ระบุ' : 'หมายเลขโทรศัพท์ที่ระบุ'}</p>
            <p className="break-words text-base">{contact}</p>
          </div>
          <p className="text-sm leading-6 text-black/60">ตัวอย่างขั้นตอนเท่านั้น ยังไม่ได้ส่ง{channel === 'email' ? 'อีเมล' : ' SMS'}จริง เนื่องจากยังไม่เชื่อมต่อระบบกู้คืนรหัสผ่าน</p>
          <button type="button" onClick={onClose} className="mt-6 h-[51px] w-full bg-black font-bold text-white hover:bg-black/80">กลับไปเข้าสู่ระบบ</button>
          <button type="button" onClick={() => setSubmitted(false)} className="mt-4 w-full text-sm underline underline-offset-4">แก้ไขข้อมูลติดต่อ</button>
        </div>
      ) : (
        <form noValidate onSubmit={submit}>
          <p id="forgot-description" className="mb-6 text-sm leading-7 text-black/70">เลือกช่องทางเพื่อรับลิงก์เปลี่ยนรหัสผ่าน โดยใช้อีเมลหรือหมายเลขโทรศัพท์ที่ลงทะเบียนไว้</p>
          <fieldset className="mb-5">
            <legend className="mb-3 text-sm">ช่องทางรับลิงก์</legend>
            <div className="grid grid-cols-2 gap-3">
              {(['email', 'sms'] as const).map((option) => (
                <label key={option} className={`flex min-h-[51px] cursor-pointer items-center justify-center gap-2 border border-black px-3 text-sm ${channel === option ? 'bg-[#e9e9e9]' : 'bg-white'}`}>
                  <input type="radio" name="channel" value={option} checked={channel === option} onChange={() => { setChannel(option); setContact(''); setError(''); }} className="accent-black" />
                  {option === 'email' ? 'อีเมล / Email' : 'โทรศัพท์ / SMS'}
                </label>
              ))}
            </div>
          </fieldset>
          <label htmlFor="reset-contact" className="mb-2 block text-sm">{channel === 'email' ? 'อีเมล' : 'หมายเลขโทรศัพท์มือถือ'}</label>
          <input autoFocus id="reset-contact" name="contact" type={channel === 'email' ? 'email' : 'tel'} autoComplete={channel === 'email' ? 'email' : 'tel'} value={contact} onChange={(event) => { setContact(event.target.value); setError(''); }} placeholder={channel === 'email' ? 'example@gmail.com' : '0812345678'} required aria-invalid={Boolean(error)} aria-describedby={error ? 'reset-error' : undefined} className={`h-[51px] w-full border px-4 font-['Inter:Light'] text-base focus:outline-2 focus:outline-offset-2 focus:outline-black ${error ? 'border-red-500' : 'border-black'}`} />
          {error && <p id="reset-error" role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
          <p className="mt-4 text-xs leading-5 text-black/60">โหมดตัวอย่าง: ยังไม่มีการส่งอีเมลหรือ SMS จริง</p>
          <button type="submit" className="mt-5 h-[51px] w-full bg-black font-['Inter:Bold'] text-base font-bold text-white hover:bg-black/80">ดำเนินการต่อ</button>
          <button type="button" onClick={onClose} className="mt-4 w-full text-sm underline underline-offset-4">กลับไปเข้าสู่ระบบ</button>
        </form>
      )}
    </dialog>
  );
}
