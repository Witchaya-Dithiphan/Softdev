import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

const fields = [
  { name: 'fullName', label: 'ชื่อ–นามสกุล / Full name', placeholder: 'กรอกชื่อและนามสกุล', autoComplete: 'name' },
  { name: 'email', label: 'อีเมล / Email', placeholder: 'example@gmail.com', autoComplete: 'email' },
  { name: 'phone', label: 'เบอร์โทรศัพท์ / Phone number', placeholder: '0812345678', autoComplete: 'tel' },
  { name: 'room', label: 'หมายเลขห้อง / Room number', placeholder: 'เช่น 101', autoComplete: 'off' },
  { name: 'invitation', label: 'เลขสัญญาเช่าหรือรหัสเชิญ', placeholder: 'กรอกเลขสัญญาเช่าหรือรหัสเชิญ', autoComplete: 'off' },
] as const;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const field of fields) {
      if (!String(data.get(field.name) ?? '').trim()) next[field.name] = 'กรุณากรอกข้อมูลนี้';
    }
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'กรุณากรอกอีเมลให้ถูกต้อง';
    }
    if (phone && !/^(?:0\d{8,9}|\+66\d{8,9})$/.test(phone.replace(/[\s()-]/g, ''))) {
      next.phone = 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง';
    }
    if (String(data.get('password') ?? '').length < 8) next.password = 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร';
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    form.reset();
    setComplete(true);
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#d9d9d9] text-black lg:flex-row">
      <aside className="relative flex flex-1 flex-col px-6 py-7 sm:px-10 lg:min-h-screen lg:px-[42px] lg:py-[37px]">
        <Link to="/login" className="flex items-center gap-3 self-start">
          <img src="/assets/fd83f.svg" alt="" className="h-7 w-7 shrink-0" />
          <span className="font-['Inter:Medium'] text-2xl font-medium">ระบบจัดการหอพัก</span>
        </Link>
        <div className="hidden flex-1 items-center justify-center py-16 lg:flex">
          <div className="flex aspect-[582/449] w-full max-w-[582px] items-center justify-center bg-[#c0c0c0]">
            <span className="font-['Inter:Regular'] text-xl">รูปหอ?</span>
          </div>
        </div>
      </aside>

      <section aria-labelledby="register-title" className="flex w-full flex-col items-center justify-center bg-white px-6 py-10 sm:px-16 lg:w-[651px] lg:shrink-0">
        <div className="w-full max-w-[523px]">
          <h1 id="register-title" className="mb-2 text-center font-['Inter:Semi_Bold'] text-[32px] font-semibold">สมัครสมาชิก</h1>
          <p className="mb-8 text-center text-sm text-black/60">สำหรับผู้พักอาศัยในหอพัก</p>

          {complete ? (
            <div role="status" className="border border-black bg-[#f5f5f5] p-6">
              <h2 className="mb-3 text-xl font-semibold">ตรวจสอบรูปแบบข้อมูลเรียบร้อยแล้ว</h2>
              <p className="text-sm leading-7 text-black/70">นี่คือหน้าสมัครสมาชิกตัวอย่าง ยังไม่มีการสร้างบัญชีหรือตรวจสอบเลขสัญญาเช่าและรหัสเชิญกับระบบหอพัก</p>
              <button type="button" onClick={() => setComplete(false)} className="mt-5 h-[51px] w-full bg-black font-bold text-white hover:bg-black/80">กลับไปหน้าสมัครสมาชิก</button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit}>
              <h2 className="mb-5 font-['Inter:Medium'] text-base font-medium">ข้อมูลสมัคร</h2>
              <div className="flex flex-col gap-4">
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label htmlFor={field.name} className="text-base">{field.label}</label>
                    <input id={field.name} name={field.name} required autoComplete={field.autoComplete} placeholder={field.placeholder}
                      type={field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'}
                      aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      className={`h-[51px] w-full border bg-transparent px-6 font-['Inter:Light'] text-base font-light placeholder:text-black/50 focus:outline-2 focus:outline-offset-2 focus:outline-black ${errors[field.name] ? 'border-red-500' : 'border-black'}`} />
                    {errors[field.name] && <p id={`${field.name}-error`} className="text-xs text-red-600">{errors[field.name]}</p>}
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-base">รหัสผ่าน / Password</label>
                  <div className={`flex h-[51px] items-center border px-6 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black ${errors.password ? 'border-red-500' : 'border-black'}`}>
                    <input id="password" name="password" required minLength={8} type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="กรอกรหัสผ่าน" aria-invalid={Boolean(errors.password)} aria-describedby="password-hint password-error" className="min-w-0 flex-1 bg-transparent font-['Inter:Light'] text-base font-light outline-none placeholder:text-black/50" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'} aria-pressed={showPassword} className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center">
                      <img src="/assets/8be0a.svg" alt="" className="h-6 w-6" />
                    </button>
                  </div>
                  <p id="password-hint" className="text-xs text-black/60">ใช้รหัสผ่านอย่างน้อย 8 ตัวอักษร</p>
                  <p id="password-error" aria-live="polite" className="text-xs text-red-600">{errors.password}</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-black/60">แบบฟอร์มตัวอย่าง ยังไม่เชื่อมต่อระบบสมัครสมาชิก</p>
              <button type="submit" className="mt-4 flex h-[51px] w-full items-center justify-center bg-black font-['Inter:Bold'] text-base font-bold text-white transition-colors hover:bg-black/80">สมัครสมาชิก</button>
            </form>
          )}
          <p className="mt-5 text-center text-sm">มีบัญชีอยู่แล้ว? <Link to="/login" className="ml-1 underline underline-offset-4 hover:text-black/60">เข้าสู่ระบบ</Link></p>
        </div>
      </section>
    </main>
  );
}
