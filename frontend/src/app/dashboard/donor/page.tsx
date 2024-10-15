"use client";

import React, {useEffect, useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import  { LastDonations } from "src/app/components/LastDonations";
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
      router.push('/login'); 
    } 
  }, [authContext, router]);

  if (!authContext?.user) {
    return null; 
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log('Renderizando panel de usuario donador con usuario:', authContext?.user);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-[#141D32]"> 
      <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar}/>

      <div className="flex flex-grow">
        {isSidebarOpen && (<Sidebar/>)}
        <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>

          <div className="mt-2">
            <LastDonations /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;