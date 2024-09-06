"use client";

import React from 'react';
import Sidebar from '../../../components/Sidebar';

const UsersPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="Admin" />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <p>Manage your users here.</p>
        {/* Aquí iría el contenido específico de la página de gestión de usuarios */}
      </div>
    </div>
  );
};

export default UsersPage;
