"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Importamos Link para los enlaces
import { createUser } from '../services/api'; // Asegúrate de que esta ruta sea la correcta

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const userData = {
      name,
      email,
      password,
      phone,
      role_id: 2, // Aquí puedes especificar el rol que corresponde.
    };

    try {
      await createUser(userData); // Llamamos a la función para crear el usuario
      router.push('/login'); // Redirigimos al usuario al login después del registro
    } catch (error) {
      setError('Error en el registro. Inténtalo de nuevo.');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
            {/* Botón Login */}
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Iniciar Sesión
              </button>
            </Link>
            {/* Botón Donación */}
            <Link href="/userdona">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                ¡Dona ya!
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Sección del formulario de registro */}
      <div className="flex items-center justify-center min-h-screen">
        {/* Fondo no debe cubrir el header */}
        <div
          style={{
            background: 'linear-gradient(to top right, #232959 50%, #1F244D 50%)',
          }}
          className="absolute top-0 left-0 w-full h-full z-0"
        ></div>
        <div className="relative z-10 items-center justify-center w-full max-w-md bg-[rgba(255,255,255)] rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center">
            <img src="/images/logoAzul.png" alt="Logo Fundación Sanders" className="h-12 w-13" />
            <h2 className="text-2xl font-semibold text-center text-[#202451] m-11">Registro</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar el error si existe */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-[#202451]">Nombre</label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border rounded-lg text-[#202451]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4">
              <label htmlFor="phone" className="block text-[#202451]">Teléfono</label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2 border rounded-lg text-[#202451]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block text-[#202451]">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#202451] text-white py-2 px-4 rounded-lg hover:bg-[#1f3b6d] transition-colors duration-300"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
