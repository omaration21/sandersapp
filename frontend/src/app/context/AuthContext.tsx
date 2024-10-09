"use client";

import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  phone: number;
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token recuperado: ', token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
        const response = await fetch('https://localhost:5001/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Correo electrónico o contraseña incorrectos');
            } else {
                throw new Error('Error en la autenticación');
            }
        }

        const data = await response.json();

        if (data.user) {
            const loggedUser = data.user;
            setUser({
                id: loggedUser.id,
                name: loggedUser.name,
                email: loggedUser.email,
                role_id: loggedUser.role_id,
                phone: loggedUser.phone,
            });

            const activeToken = data.token;

            localStorage.setItem('token', activeToken);

            if (loggedUser.role_id === 1) {
                setRole('Admin');
                router.push('/dashboard/admin');
            } else if (loggedUser.role_id === 2) {
                setRole('Donor');
                router.push('/dashboard/donor');
            } else {
                throw new Error('Rol no reconocido');
            }

            console.log(`Usuario autenticado como: ${loggedUser.email}, Rol: ${loggedUser.role_id}`);
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error en la autenticación en AuthContext', error);
        throw error;
    }
};



  const logout = () => {
    setUser(null);
    setRole(null);

    localStorage.removeItem('token');
    console.log('Sesión cerrada');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};