"use client";

import React from 'react';
import Sidebar from '../../../components/Sidebar';


const DonationsPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="Donor" />
      <div className="flex-1 p-10 ml-64"> {/* Añadimos ml-64 para compensar el espacio del Sidebar */}
        <h2 className="text-2xl font-semibold">Donations</h2>
        <p>Welcome to the donations page! Here you can view and manage your donations.</p>
        {/* Aquí iría el contenido específico de la página de donaciones */}
      </div>
    </div>
  );
};

export default DonationsPage;
