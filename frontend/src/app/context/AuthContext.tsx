"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  phone: string;
  profile_image_url: string;
}

interface AuthContextType {
  user: User | null;
  role: 'Admin' | 'Donor' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;  // Añadimos setUser
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'Admin' | 'Donor' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
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
          profile_image_url: loggedUser.profile_image_url,
        });

        const activeToken = data.token;
        const refreshToken = data.refreshToken;

        Cookies.set('token', activeToken, { expires: 1 / 24 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });

        if (loggedUser.role_id === 1) {
          setRole('Admin');
          router.push('/dashboard/admin');
        } else if (loggedUser.role_id === 2) {
          setRole('Donor');
          console.log('Usuario donante autenticado');
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
    localStorage.removeItem('refreshToken');
    Cookies.remove('refreshToken');
    Cookies.remove('token');
    console.log('Sesión cerrada');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe estar dentro de un AuthProvider');
  }
  return context;
};