"use client";

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './context/AuthContext';

export default function HomePage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext?.user) {
      // Si el usuario está autenticado, redirige al dashboard correspondiente según su rol
      if (authContext.role === 'Admin') {
        router.push('/dashboard/admin');
      } else if (authContext.role === 'Donor') {
        router.push('/dashboard/donor');
      }
    } else {
      router.push('/login');
    }
  }, [authContext, router]);

  return null; // No renderiza nada ya que el componente solo se utiliza para redirecciones
}
