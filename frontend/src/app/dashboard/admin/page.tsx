"use client";

import React, { useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import IncomePanel from '../../components/IncomePanel';

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log('User:', authContext?.user);
    console.log('Role:', authContext?.role);

    if (!authContext?.user) {
      console.log('No user found, redirecting to login');
      router.push('/login'); // Redirect if no authenticated user
    } else if (authContext.role !== 'Admin') {
      console.log('User is not Admin, redirecting to login');
      router.push('/login'); // Redirect if user is not an Admin
    }
  }, [authContext, router]);

  if (!authContext?.user || authContext.role !== 'Admin') {
    return null; 
  }

  console.log('Rendering Admin Dashboard');

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#2c3e50' }}> {/* Fondo gris medianoche */}
      <Sidebar role="Admin" />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-semibold text-white">Admin Dashboard Overview</h2>
        
        {/* Adjusted IncomePanel size and aligned to the left */}
        <div className="mt-6" style={{ width: '60%' }}>  {/* Alineado a la izquierda */}
          <IncomePanel />  {/* Renderizado del componente IncomePanel */}
        </div>

        {/* Aquí es donde puedes agregar otro componente */}
        <div className="mt-6">
          {/* Componente adicional vendrá aquí */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;