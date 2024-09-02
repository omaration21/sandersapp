"use client";

import React from 'react';
import Sidebar from '../../components/Sidebar';

const DonorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="Donor" />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-semibold">Donor Dashboard Overview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contenido específico del dashboard de Donor */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 1</h3>
            <p className="mt-2">Donor-specific content goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
