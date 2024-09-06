"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); // Redirige a la página de login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Fundación Sanders</h1>
          <p className="text-lg mb-6">Juntos construimos un futuro mejor</p>
          <button
            onClick={handleLoginClick}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
          <p className="text-lg text-gray-700 mb-4">
            Somos una organización sin fines de lucro dedicada a ayudar a las comunidades más vulnerables.
            Nuestro objetivo es mejorar la calidad de vida a través de programas de educación, salud, y desarrollo sostenible.
          </p>
          <img src="/images/about.jpg" alt="Sobre Nosotros" className="w-full h-auto rounded-lg shadow-lg mt-8" />
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-8 bg-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nuestro Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">+10,000</h3>
              <p className="text-gray-700">Personas ayudadas</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">+50</h3>
              <p className="text-gray-700">Proyectos completados</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">+200</h3>
              <p className="text-gray-700">Voluntarios activos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p className="text-lg">© {new Date().getFullYear()} Fundación Sanders. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
