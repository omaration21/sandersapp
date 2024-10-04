"use client";

import React, { useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import IncomePanel from '../../components/IncomePanel';
import PiePanel from '../../components/PiePanel';
import RecentDonations from '../../components/RecentDonations'; // Import RecentDonations

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext?.user) {
      router.push('/login'); // Redirect if no authenticated user
    } else if (authContext.role !== 'Admin') {
      router.push('/login'); // Redirect if user is not an Admin
    }
  }, [authContext, router]);

  if (!authContext?.user || authContext.role !== 'Admin') {
    return null; 
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#2c3e50' }}> {/* Fondo gris medianoche */}
      <Sidebar role="Admin" />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-semibold text-white">Admin Dashboard Overview</h2>
        
        {/* Contenedor para alinear IncomePanel y PiePanel uno al lado del otro */}
        <div className="flex mt-6 justify-between" style={{ height: '550px' }}>
            <IncomePanel />  {/* Renderizado del componente IncomePanel */}

            <PiePanel />  {/* Renderizado del componente PiePanel */}
        </div>

        {/* Componente de donaciones recientes a toda la página */}
        <div className="mt-6">
          <RecentDonations />  {/* Renderizado del componente RecentDonations */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;