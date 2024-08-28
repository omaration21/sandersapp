"use client";

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext?.user) {
      router.push('/login'); // Redirige si no hay un usuario autenticado
    } else if (authContext.role !== 'Admin') {
      router.push('/login'); // Redirige si el rol no es Admin
    }
  }, [authContext, router]);

  if (!authContext?.user || authContext.role !== 'Admin') {
    return <div>Cargando...</div>; // Renderiza un mensaje de carga mientras redirige
  }

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>
        <nav className="mt-5">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Users
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Settings
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Reports
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="block w-full py-2.5 px-4 mt-4 bg-red-600 text-white rounded transition duration-200 hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-semibold">Admin Dashboard Overview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 1</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 2</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 3</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 4</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
