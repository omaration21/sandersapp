"use client";

import React, { useEffect, useContext, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import IncomePanel from '../../components/IncomePanel';
import PiePanel from '../../components/PiePanel';
import RecentDonations from '../../components/RecentDonations'; 
import { UpperBar } from 'src/app/components/UpperBar';

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

  // Estado para controlar la visibilidad del sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Función para alternar la visibilidad del sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!authContext?.user || authContext.role !== 'Admin') {
    return null; 
  }

  console.log('Renderizando Panel de Administrador');

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#1F244D' }}> {/* Fondo gris medianoche */}
      {/* Renderizamos UpperBar pasando el usuario */}
      <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-grow">
        {isSidebarOpen && (<Sidebar/>)}
        <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
          
          {/* Contenedor para alinear IncomePanel y PiePanel uno al lado del otro */}
          <div className="flex justify-between" style={{ height: '600px' }}>
            <IncomePanel />  {/* Renderizado del componente IncomePanel */}
            <PiePanel />  {/* Renderizado del componente PiePanel */}
          </div>  

          {/* Componente de donaciones recientes a toda la página */}
          <div className="mt-6">
            <RecentDonations />  {/* Renderizado del componente RecentDonations */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;