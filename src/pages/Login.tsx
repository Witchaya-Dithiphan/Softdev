import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordDialog from '../components/ForgotPasswordDialog';

const assetPathPrefix = '/assets';
const imgEye = `${assetPathPrefix}/8be0a.svg`;
const imgHouse = `${assetPathPrefix}/fd83f.svg`;

const DEMO_HINTS = [
  { label: 'ผู้ดูแลหอ (Caretaker)', email: 'caretaker@demo.com', password: '1234' },
  { label: 'เจ้าของหอ (Owner)', email: 'owner@demo.com', password: '1234' },
  { label: 'ผู้พักอาศัย (Tenant)', email: 'tenant@demo.com', password: '1234' },
  { label: 'ช่างซ่อม (Repairman)', email: 'repairman@demo.com', password: '1234' },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setError('');
    const ok = login(email, password);
    if (ok) {
      const e = email.trim().toLowerCase();
      if (e.startsWith('owner')) navigate('/users');
      else if (e.startsWith('tenant')) navigate('/tenant/home');
      else if (e.startsWith('repairman')) navigate('/repairman/jobs');
      else navigate('/dashboard');
    } else {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const fillDemo = (hint: typeof DEMO_HINTS[0]) => {
    setEmail(hint.email);
    setPassword(hint.password);
    setError('');
  };

  return (
    <div className="flex min-h-screen bg-[#d9d9d9]">
      {/* Left panel */}
      <div className="flex-1 flex flex-col relative">
        {/* Logo top-left */}
        <div className="absolute top-[37px] left-[42px] flex gap-3 items-center">
          <img src={imgHouse} alt="" className="w-7 h-7 flex-shrink-0" />
          <span className="font-['Inter:Medium'] font-medium text-2xl text-black whitespace-nowrap">
            ระบบจัดการหอพัก
          </span>
        </div>

        {/* Building image placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#c0c0c0] w-[582px] h-[449px] flex items-center justify-center">
            <span className="font-['Inter:Regular'] font-normal text-xl text-black">รูปหอ?</span>
          </div>
        </div>

        {/* Demo credentials hint */}
        <div className="absolute bottom-8 left-10 right-10">
          <p className="font-['Inter:Regular'] font-normal text-xs text-black/60 mb-2">Demo credentials:</p>
          <div className="flex gap-3 flex-wrap">
            {DEMO_HINTS.map((hint) => (
              <button
                key={hint.email}
                onClick={() => fillDemo(hint)}
                className="border border-black/30 bg-white/60 px-3 py-1.5 text-left hover:bg-white/90 transition-colors"
              >
                <p className="font-['Inter:Semi Bold'] font-semibold text-xs text-black">{hint.label}</p>
                <p className="font-['Inter:Regular'] font-normal text-xs text-black/70">{hint.email} / {hint.password}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-white w-[651px] flex flex-col items-center justify-center px-16">
        <h1 className="font-['Inter:Semi Bold'] font-semibold text-[32px] text-black mb-10">
          เข้าสู่ระบบ
        </h1>

        {/* Email field */}
        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-['Inter:Regular'] font-normal text-base text-black">
            อีเมล / Email
          </label>
          <div className="border border-black flex items-center h-[51px] px-6">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="example@gmail.com"
              className="w-full font-['Inter:Light'] font-light text-base text-black outline-none bg-transparent placeholder:text-black/50"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-3 w-full mb-2">
          <label className="font-['Inter:Regular'] font-normal text-base text-black">
            รหัสผ่าน / Password
          </label>
          <div className={`border flex items-center justify-between h-[51px] px-6 ${error ? 'border-red-500' : 'border-black'}`}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="w-full font-['Inter:Light'] font-light text-base text-black outline-none bg-transparent placeholder:text-black"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="flex-shrink-0 ml-2">
              <img src={imgEye} alt="toggle password" className="w-6 h-6" />
            </button>
          </div>
          {error && (
            <p className="font-['Inter:Regular'] font-normal text-xs text-red-500">{error}</p>
          )}
        </div>

        {/* Forgot password */}
        <div className="w-full text-right mb-6">
          <button type="button" onClick={() => setShowForgotPassword(true)} className="font-['Inter:Light'] font-light text-xs text-black cursor-pointer hover:underline">
            ลืมรหัสผ่าน
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black h-[51px] flex items-center justify-center mb-4 cursor-pointer hover:bg-black/80 transition-colors"
        >
          <span className="font-['Inter:Bold'] font-bold text-base text-white text-center">
            เข้าสู่ระบบ
          </span>
        </button>

        {/* Register link */}
        <Link to="/register" className="font-['Inter:Regular'] font-normal text-base text-black cursor-pointer hover:underline">
          สมัครสมาชิก / Register
        </Link>
      </div>
      {showForgotPassword && <ForgotPasswordDialog initialEmail={email} onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
}
