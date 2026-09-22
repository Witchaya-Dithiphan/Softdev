import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const assetPathPrefix = '/assets';
const imgHouse = `${assetPathPrefix}/fd83f.svg`;
const imgUser = `${assetPathPrefix}/52224.svg`;
const imgNavIcon = `${assetPathPrefix}/338e5.svg`;

const caretakerNav = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'จัดการห้องพัก', path: '/rooms' },
  { label: 'ข้อมูลผู้พักอาศัย', path: '/tenants' },
  { label: 'มิเตอร์น้ำ / ไฟ', path: '/meters' },
  { label: 'ส่งแจ้งเตือน', path: '/notifications' },
  { label: 'ยืม/คืนของส่วนกลาง', path: '/borrow' },
  { label: 'แชท', path: '/chat' },
];

const ownerNav = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'ผู้ใช้งานและสิทธิ์', path: '/users' },
  { label: 'ประวัติการใช้งานระบบ', path: '/activity' },
];

const repairmanNav = [
  { label: 'Dashboard', path: '/repairman/jobs' },
  { label: 'ประวัติการซ่อม', path: '/repairman/history' },
];

const tenantNav = [
  { label: 'หน้าแรก', path: '/tenant/home' },
  { label: 'การแจ้งเตือน', path: '/tenant/notifications' },
  { label: 'แจ้งชำระเงิน', path: '/tenant/payment' },
  { label: 'แจ้งซ่อม', path: '/tenant/repair' },
  { label: 'ประวัติการชำระเงิน', path: '/tenant/payment-history' },
  { label: 'Marketplace', path: '/tenant/marketplace' },
  { label: 'บอร์ด SOS', path: '/tenant/sos' },
  { label: 'ยืม/คืนของส่วนกลาง', path: '/tenant/borrow' },
  { label: 'ข่าวสาร', path: '/tenant/news' },
  { label: 'สัญญาเช่า', path: '/tenant/contract' },
  { label: 'แชท', path: '/tenant/chat' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const role = user?.role ?? 'caretaker';
  const userName = user?.name ?? 'ผู้ดูแลหอ';
  const roleLabel = role === 'caretaker' ? 'Caretaker' : role === 'owner' ? 'Owner' : role === 'repairman' ? 'Repairman' : 'user';
  const navItems = role === 'caretaker' ? caretakerNav : role === 'owner' ? ownerNav : role === 'repairman' ? repairmanNav : tenantNav;

  const activeIdx = navItems.findIndex(n => n.path === location.pathname);
  const indicatorTop = activeIdx >= 0 ? 195 + activeIdx * 42 : 195;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-[310px] min-h-screen bg-white flex flex-col flex-shrink-0 border-r border-black relative">
      {/* Logo */}
      <div className="flex gap-3 items-center px-6 pt-7 pb-4">
        <img src={imgHouse} alt="" className="w-7 h-7 flex-shrink-0" />
        <span className="font-['Inter:Medium'] font-medium text-2xl text-black whitespace-nowrap">
          ระบบจัดการหอพัก
        </span>
      </div>

      {/* User profile */}
      <div className="mx-6 border border-black border-dashed flex gap-4 items-center h-14 px-3">
        <img src={imgUser} alt="" className="w-5 h-5 flex-shrink-0" />
        <div className="flex flex-col gap-0.5 text-sm text-black">
          <span className="font-['Inter:Semi Bold'] font-semibold">{userName}</span>
          <span className="font-['Inter:Regular'] font-normal">Role : {roleLabel}</span>
        </div>
      </div>

      {/* Top divider */}
      <div className="border-t border-black mt-4" />

      {/* Active indicator bar */}
      {activeIdx >= 0 && (
        <div
          className="absolute left-0 bg-[#a39e9e] w-[11px] h-[39px] transition-all"
          style={{ top: `${indicatorTop}px` }}
        />
      )}

      {/* Nav items */}
      <nav className="flex flex-col gap-[26px] px-10 pt-6 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex gap-4 items-center"
          >
            <img src={imgNavIcon} alt="" className="w-5 h-5 flex-shrink-0" />
            <span className={`font-['Inter:Regular'] font-normal text-base text-black whitespace-nowrap ${location.pathname === item.path ? 'font-semibold underline-offset-2' : ''}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Bottom divider + logout */}
      <div className="mt-auto">
        <div className="border-t border-black mb-3" />
        <button
          onClick={handleLogout}
          className="block w-full text-left px-[107px] pb-4 font-['Inter:Regular'] font-normal text-lg text-black whitespace-nowrap hover:underline"
        >
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}
