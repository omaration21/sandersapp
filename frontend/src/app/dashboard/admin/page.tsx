"use client";

import React, { useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log('Usuario:', authContext?.user);
    console.log('Rol:', authContext?.role);

    if (!authContext?.user) {
      console.log('No se encontró un usuario, redirigiendo al inicio de sesión');
      router.push('/login'); // Redirige si no hay un usuario autenticado
    } else if (authContext.role !== 'Admin') {
      console.log('El usuario no es administrador, redirigiendo al inicio de sesión');
      router.push('/login'); // Redirige si el rol no es Admin
    }
  }, [authContext, router]);

  if (!authContext?.user || authContext.role !== 'Admin') {
    return null; 
  }

  console.log('Renderizando Panel de Administrador');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="Admin" />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-semibold">Vista de Panel de Administrador</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contenido específico del dashboard de Admin */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Carta de Administrador 1</h3>
            <p className="mt-2">Aquí va el contenido específico del Administrador.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
