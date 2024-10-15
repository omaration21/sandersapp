"use client";

import React, { useEffect, useContext, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import IncomePanel from '../../components/IncomePanel';
import PiePanel from '../../components/PiePanel';
import RecentDonations from '../../components/RecentDonations'; 
import { PersonalizedReport } from 'src/app/components/PersonalizedReport';
import { UpperBar } from 'src/app/components/UpperBar';

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log('Usuario:', authContext?.user);
    console.log('Rol:', authContext?.role);

    if (!authContext?.user) {
      console.log('No se encontró un usuario, redirigiendo al inicio de sesión');
      router.push('/login'); 
    } else if (authContext.role !== 'Admin') {
      console.log('El usuario no es administrador, redirigiendo al inicio de sesión');
      router.push('/login');
    }
  }, [authContext, router]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!authContext?.user || authContext.role !== 'Admin') {
    return null; 
  }

  console.log('Renderizando Panel de Administrador');

  return (
    <div className="flex flex-col min-h-screen bg-gray-white dark:bg-[#141D32]"> 
      <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar}/>

      <div className="flex flex-grow">
        {isSidebarOpen && (<Sidebar/>)}
        <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
          <div className="flex justify-between gap-6" style={{ height: '600px' }}>
            <IncomePanel /> 
            <PiePanel /> 
          </div>  

          <div className="mt-6">
            <RecentDonations /> 
          </div>

          <div className="mt-6">
            <PersonalizedReport /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;