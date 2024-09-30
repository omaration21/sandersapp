import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = ({ role }: { role: string }) => {
  const router = useRouter();

  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed">
      <div className="p-4">
        <h1 className="text-lg font-semibold">Panel de {role}</h1>
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
            router.push('/login');
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
