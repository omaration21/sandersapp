"use client";

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importamos Link para el logo

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); 
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (authContext) {
        try {
            await authContext.login(email, password);
        } catch (error: any) {
            setError(error.message || 'Error en la autenticación. Inténtalo de nuevo.');
            console.error('Error en la autenticación en front de page:', error);
        }
    }
  };

  const handleRegisterClick = () => {
    router.push('/signup'); // Redirige a la página de signup
  };

  const handleDonationClick = () => {
    router.push('/userdona'); // Redirige a la página de donaciones
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header con logo como imagen y navegación */}
      <header className="bg-[#202451] text-white py-4 shadow-md relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          {/* Imagen del logo con enlace */}
          <div>
            <Link href="/">
              <img src="/images/logo.webp" alt="Logo Fundación Sanders" className="h-12 cursor-pointer" />
            </Link>
          </div>
          <nav className="space-x-6">
            {/* Botón SignUp */}
            <button
              onClick={handleRegisterClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Registrate
            </button>
            {/* Botón Donacion */}
            <button
              onClick={handleDonationClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              ¡Dona ya!
            </button>
          </nav>
        </div>
      </header>

      {/* Sección del formulario de Login */}
      <div className="flex items-center justify-center min-h-screen relative">
        {/* Fondo debe cubrir toda la pantalla */}
        <div
          style={{
            background: 'linear-gradient(to top right, #1F244D 50%, #232959 50%)',
          }}
          className="absolute top-0 left-0 w-full min-h-full z-0" // Cambiado h-full por min-h-full
        ></div>
        <div className="relative z-10 items-center justify-center w-full max-w-md bg-[rgba(255,255,255)] rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center ">
            <img src="/images/logoAzul.png" alt="Logo Fundación Sanders" className="h-12 w-13" />
            <h2 className="text-2xl font-semibold text-center text-[#202451] m-11 ">Inicia sesión</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar el error si existe */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#202451]">Correo</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-lg text-[#202451]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-[#202451]">Contraseña</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#202451] text-[rgba(255,255,255,0.5)] py-3 rounded-lg hover:bg-[#778DA9] text-[#202451]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;