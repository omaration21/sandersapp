"use client";

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  role: 'Admin' | 'Donor' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'Admin' | 'Donor' | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();
      
      // Verifica si se recibió un usuario
      if (data.user && data.user.length > 0) {
        const loggedUser = data.user[0]; // Accede al primer (y único) usuario del array
        setUser({ email: loggedUser.email });

        // Verifica el rol del usuario usando role_id
        if (loggedUser.role_id === 1) {
          setRole('Admin');
          console.log('Entrando a Admin');
          router.push('/dashboard/admin');
        } else if (loggedUser.role_id === 2) {
          setRole('Donor');
          router.push('/dashboard/donor');
        } else {
          throw new Error('Rol no reconocido');
        }

        console.log(`Usuario autenticado como: ${loggedUser.email}, Rol: ${loggedUser.role_id}`);
      } else {
        throw new Error('Usuario no encontrado en la respuesta');
      }
    } catch (error) {
      console.error('Error en la autenticación en AuthContext', error);
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    console.log('Sesión cerrada');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};