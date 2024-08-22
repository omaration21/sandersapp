"use client";

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  role: 'Admin' | 'Donor' | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'Admin' | 'Donor' | null>(null);
  const router = useRouter();

  const login = (email: string, password: string) => {
    console.log(`Intento de login con Email: ${email}, Password: ${password}`);
    if (email === 'admin@e.com' && password === 'admin') {
      setUser({ email });
      setRole('Admin');
      router.push('/dashboard/admin');
    } else if (email === 'donor@e.com' && password === 'donor') {
      setUser({ email });
      setRole('Donor');
      router.push('/dashboard/donor');
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
