import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Borrow from './pages/Borrow';
import Tenants from './pages/Tenants';
import Meters from './pages/Meters';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import Users from './pages/Users';
import ActivityLog from './pages/ActivityLog';
import TenantHome from './pages/tenant/TenantHome';
import TenantNotifications from './pages/tenant/TenantNotifications';
import TenantPayment from './pages/tenant/TenantPayment';
import TenantRepair from './pages/tenant/TenantRepair';
import TenantPaymentHistory from './pages/tenant/TenantPaymentHistory';
import TenantMarketplace from './pages/tenant/TenantMarketplace';
import TenantSOS from './pages/tenant/TenantSOS';
import TenantBorrow from './pages/tenant/TenantBorrow';
import TenantNews from './pages/tenant/TenantNews';
import TenantContract from './pages/tenant/TenantContract';
import TenantChat from './pages/tenant/TenantChat';
import RepairmanJobs from './pages/repairman/RepairmanJobs';
import RepairmanHistory from './pages/repairman/RepairmanHistory';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/meters" element={<Meters />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activity" element={<ActivityLog />} />
        <Route path="/tenant/home" element={<TenantHome />} />
        <Route path="/tenant/notifications" element={<TenantNotifications />} />
        <Route path="/tenant/payment" element={<TenantPayment />} />
        <Route path="/tenant/repair" element={<TenantRepair />} />
        <Route path="/tenant/payment-history" element={<TenantPaymentHistory />} />
        <Route path="/tenant/marketplace" element={<TenantMarketplace />} />
        <Route path="/tenant/sos" element={<TenantSOS />} />
        <Route path="/tenant/borrow" element={<TenantBorrow />} />
        <Route path="/tenant/news" element={<TenantNews />} />
        <Route path="/tenant/contract" element={<TenantContract />} />
        <Route path="/tenant/chat" element={<TenantChat />} />
        <Route path="/repairman/jobs" element={<RepairmanJobs />} />
        <Route path="/repairman/history" element={<RepairmanHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
