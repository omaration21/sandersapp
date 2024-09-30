"use client";

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (authContext) {
      try {
        // Esperar la llamada de login
        await authContext.login(email, password);
      } catch (error) {
        setError('Error en la autenticación. Inténtalo de nuevo.');
        console.error('Error en la autenticación en front de page:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center">
       <div
  style={{
    background: 'linear-gradient(to top right, #232959 50%, #1F244D 50%)',
  }}
  className="absolute top-0 left-0 w-full h-full"
></div>
      <div className="relative z-10 items-center justify-center w-full max-w-md bg-[rgba(255,255,255)] rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center ">
          <img src="/images/logoAzul.png" alt="Logo Fundación Sanders" className="h-12 w-13" />
          <h2 className="text-2xl font-semibold text-center text-[#202451] m-11 ">Inicio de sesión</h2>
        </div>
        

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar el error si existe */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#202451]">Email</label>
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
            Iniciar Sesión
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
