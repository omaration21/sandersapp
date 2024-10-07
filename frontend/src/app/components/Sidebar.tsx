import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';  // Importa el hook useAuth

const Sidebar = () => {
  // const router = useRouter();
  const { role, logout } = useAuth();  // Utiliza useAuth para acceder al rol y al método logout

  return (
    <div className="w-64 text-white h-full fixed mt-24" style={{ backgroundColor: '#232959' }}> 
      <div className="p-4">
        <h1 className="text-lg font-semibold">{role === 'Admin' ? 'Administrador' : 'Donante'}</h1>
      </div>
      <nav className="mt-5">
        <Link href={role === 'Admin' ? "/dashboard/admin" : "/dashboard/donor"}>
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Tablero
          </span>
        </Link>
        <Link href={role === 'Admin' ? "/dashboard/admin/users" : "/dashboard/donor/donations"}>
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            {role === 'Admin' ? "Usuarios" : "Donaciones"}
          </span>
        </Link>
        <Link href={role === 'Admin' ? "/dashboard/admin/settings" : "/dashboard/donor/settings"}>
          <span className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Configuración
          </span>
        </Link>
        <button
          onClick={() => {
            logout();  // Llama al método logout
          }}
          className="block w-full py-2.5 px-4 mt-4 bg-red-600 text-white rounded transition duration-200 hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;