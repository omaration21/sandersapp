"use client";

import React, {useEffect, useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import IncomePanel from '../../components/IncomePanel';
import PiePanel from '../../components/PiePanel';
import RecentDonations from '../../components/RecentDonations';
import { PersonalizedReport } from 'src/app/components/PersonalizedReport';
import { UpperBar } from 'src/app/components/UpperBar';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const DonorDashboard = () => {

  console.log('Renderizando panel de usuario donador');

  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    console.log('Usuario:', authContext?.user);
    console.log('Rol:', authContext?.role);

    if (!authContext?.user) {
      console.log('No se encontró un usuario, redirigiendo al inicio de sesión');
      router.push('/login'); // Redirige si no hay un usuario autenticado
    } 
  }, [authContext, router]);

  if (!authContext?.user) {
    return null; 
  }

  // Función para alternar la visibilidad del sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log('Renderizando panel de usuario donador con usuario:', authContext?.user);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#141D32]">
      {/* Renderizamos UpperBar, pero sin funcionalidad específica para el donador */}
      <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar}/>

      <div className="flex flex-grow">
        {isSidebarOpen && (<Sidebar/>)}
        <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
          <h2 className="text-2xl font-semibold">Donor Dashboard Overview</h2>
          
          {/* Contenido específico del dashboard de Donor */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Your Contributions</h3>
                <IncomePanel /> {/* Adaptamos el IncomePanel para mostrar contribuciones específicas del donador */}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Impact Overview</h3>
                <PiePanel /> {/* El PiePanel puede mostrar cómo sus donaciones están siendo utilizadas */}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <RecentDonations /> {/* Muestra las donaciones recientes en la comunidad */}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <PersonalizedReport /> {/* Ofrecemos un reporte personalizado de impacto */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;