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
        router.push('/'); // Redirigir a la página de inicio
      } catch (error) {
        setError('Error en la autenticación. Inténtalo de nuevo.');
        console.error('Error en la autenticación en front de page:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/nopales.jpg')` }}>
      <div className="w-full max-w-md bg-[rgba(255,255,255,0.5)] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#202451]">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar el error si existe */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#202451]">Email</label>
            <input
              id="email" // Asocia este campo de entrada con la etiqueta del correo electrónico
              type="email"
              className="w-full px-4 py-2 border rounded-lg text-[#202451]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-[#202451]">Password</label>
            <input
              id="password" // Asocia este campo de entrada con la etiqueta de la contraseña
              type="password"
              className="w-full px-4 py-2 border rounded-lg text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#202451] text-[rgba(255,255,255,0.5)] py-2 rounded-lg hover:bg-[#778DA9] text-[#202451]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;