"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); // Redirige a la página de login
  };

  const handleRegisterClick = () => {
    router.push('/signup'); //Redirige a la página de signup
  };

  const handleDonationClick = () => {
    router.push('/userdona'); //Redirige a la página de donaciones
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header con logo como imagen y navegación */}
      <header className="bg-[#202451] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Imagen del logo con enlace */}
          <div>
            <Link href="/">
              <img src="/images/logo.webp" alt="Logo Fundación Sanders" className="h-12 cursor-pointer" />
            </Link>
          </div>
          <nav className="space-x-6">
            {/* Botón Login */}
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
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

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[600px]" style={{ backgroundImage: "url('/images/paginaInicial.webp')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Llevamos agua hasta donde más se necesita</h1>
        </div>
      </section>

      {/* Situación Actual Section */}
      <section className="container mx-auto py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-[#202451] mb-8">Situación Actual</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8">
          {/* Primer bloque, más grande */}
          <div className="md:col-span-2 md:row-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-6xl font-bold text-[#202451]">12 MILLONES</h3>
            <p className="mt-4 text-gray-600">No cuentan con acceso a agua potable.</p>
          </div>
          {/* Segundo bloque */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
            <h3 className="text-5xl font-bold text-[#202451]">+5 MILLONES</h3>
            <p className="mt-4 text-gray-600">Padecen desnutrición crónica.</p>
          </div>
          {/* Tercer bloque */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
            <h3 className="text-5xl font-bold text-[#202451]">4 DE CADA 10</h3>
            <p className="mt-4 text-gray-600">Nacimientos son en niñas menores de 17 años.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
          <p className="text-lg text-gray-700 mb-4">
            Somos una organización sin fines de lucro dedicada a ayudar a las comunidades más vulnerables.
            Nuestro objetivo es mejorar la calidad de vida a través de programas de educación, salud, y desarrollo sostenible.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p className="text-lg">© {new Date().getFullYear()} Fundación Sanders. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
