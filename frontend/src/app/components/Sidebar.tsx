import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; 
const Sidebar = () => {
  const { role, logout } = useAuth(); 

  return (
    <div className="w-64 text-white dark:text-gray-300 h-full fixed mt-20 bg-[#232959] dark:bg-gray-900 transition-colors">
      <div className="p-4">
        <h1 className="text-lg font-semibold">
          {role === 'Admin' ? 'Administrador' : 'Donante'}
        </h1>
      </div>
      <nav className="mt-5">
        <Link href={role === 'Admin' ? "/dashboard/admin" : "/dashboard/donor"}>
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-300">
            Tablero
          </span>
        </Link>
        <Link href={role === 'Admin' ? "/dashboard/admin/users" : "/dashboard/donor/donations"}>
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-300">
            {role === 'Admin' ? 'Usuarios' : 'Donar'}
          </span>
        </Link>

        {/* Renderiza el enlace al chat solo si el rol es Admin */}
        {role === 'Admin' && (
          <Link href="/dashboard/admin/chat">
            <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-300">
              SandersChat
            </span>
          </Link>
        )}

        {role === 'Donor' && (
          <Link href="/dashboard/donor/contacto">
            <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-300">
              Contacto
            </span>
          </Link>
        )}

        <Link href={role === 'Admin' ? "/dashboard/admin/settings" : "/dashboard/donor/settings"}>
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white dark:hover:text-gray-300">
            Configuración
          </span>
        </Link>

        <button
          onClick={() => {
            logout(); 
          }}
          className="block w-full py-2.5 px-4 mt-4 bg-red-600 dark:bg-red-700 text-white rounded transition duration-200 hover:bg-red-700 dark:hover:bg-red-800"
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;