import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'caretaker' | 'owner' | 'tenant' | 'repairman' | null;

interface AuthUser {
  name: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const DEMO_CREDENTIALS: Record<string, { password: string; name: string; role: 'caretaker' | 'owner' | 'tenant' | 'repairman' }> = {
  'caretaker@demo.com':  { password: '1234', name: 'ผู้ดูแลหอ', role: 'caretaker' },
  'owner@demo.com':      { password: '1234', name: 'เจ้าของหอ', role: 'owner' },
  'tenant@demo.com':     { password: '1234', name: 'ผู้พักอาศัย ห้อง1134', role: 'tenant' },
  'repairman@demo.com':  { password: '1234', name: 'ช่างซ่อม', role: 'repairman' },
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string): boolean => {
    const cred = DEMO_CREDENTIALS[email.trim().toLowerCase()];
    if (cred && cred.password === password) {
      setUser({ name: cred.name, role: cred.role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
