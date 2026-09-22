import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  requiredRole?: 'caretaker' | 'owner' | 'tenant' | 'repairman';
  children: React.ReactNode;
}

export default function Layout({ requiredRole, children }: LayoutProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (requiredRole && user.role !== requiredRole) {
      if (user.role === 'owner') navigate('/users', { replace: true });
      else if (user.role === 'tenant') navigate('/tenant/home', { replace: true });
      else if (user.role === 'repairman') navigate('/repairman/jobs', { replace: true });
      else navigate('/dashboard', { replace: true });
    }
  }, [user, requiredRole, navigate]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#d9d9d9]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
