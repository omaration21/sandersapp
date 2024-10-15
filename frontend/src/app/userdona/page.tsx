"use client";

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import PayPalPayment from '../components/PayPalPayment';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const DonacionInvitado = () => {
  const [monto, setMonto] = useState<number | string>(''); 
  const [customMonto, setCustomMonto] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { user } = authContext || {};

  const [sector, setSector] = useState<string>("1");
  const [comentario, setComentario] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");

  const handleMontoClick = (montoSeleccionado: number) => {
    if (monto === montoSeleccionado) {
      setMonto('');
    } else {
      setMonto(montoSeleccionado);
      setCustomMonto(''); 
      setError(null);
    }
  };

  const handleCustomMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMonto(e.target.value);
    setMonto('');
    setError(null);
  };

  const finalMonto = monto || customMonto;

  const handleLoginClick = () => {
    router.push('/login'); 
  };

  const handleRegisterClick = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-[#202451] text-white py-4 shadow-md relative z-10">
        <div className="container mx-auto flex justify-between items-center">
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
              Iniciar Sesión
            </button>
            {/* Botón Signup */}
            <button
              onClick={handleRegisterClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Registrate
            </button>
          </nav>
        </div>
      </header>


      <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg relative z-10">
          <div className="md:w-1/2 flex flex-col justify-center items-center bg-[#f7f7f7] p-10">
            <h1 className="text-4xl font-bold text-[#202440] mb-10 text-center">
              ¡Únete a la causa!
            </h1>
            <img
              src="/images/boy.jpg"
              alt="Cause illustration"
              className="max-w-full h-auto object-cover"
            />
          </div>

          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-[#202451] text-2xl font-semibold mb-6 text-center">
              Tu donación ayudará a nuestras causas en agua, educación sexual y alimentación.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => handleMontoClick(50)}
                className={`p-4 rounded-lg text-center ${monto === 50 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
              >
                <h3 className="text-xl font-semibold">$50</h3>
                <p>Apoya la compra de kits de análisis de agua</p>
              </button>
              <button
                onClick={() => handleMontoClick(150)}
                className={`p-4 rounded-lg text-center ${monto === 150 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
              >
                <h3 className="text-xl font-semibold">$150</h3>
                <p>Contribuye a la educación sexual en comunidades rurales</p>
              </button>
              <button
                onClick={() => handleMontoClick(250)}
                className={`p-4 rounded-lg text-center ${monto === 250 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
              >
                <h3 className="text-xl font-semibold">$250</h3>
                <p>Ayuda a proporcionar alimentación sostenible</p>
              </button>
              <button
                onClick={() => handleMontoClick(500)}
                className={`p-4 rounded-lg text-center ${monto === 500 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
              >
                <h3 className="text-xl font-semibold">$500</h3>
                <p>Brinda agua potable a una familia durante un mes</p>
              </button>
              <button
                onClick={() => handleMontoClick(1000)}
                className={`p-4 rounded-lg text-center ${monto === 1000 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
              >
                <h3 className="text-xl font-semibold">$1000</h3>
                <p>Apoya la construcción de pozos en comunidades sin acceso al agua</p>
              </button>
              <div className="p-4 rounded-lg text-center bg-white border-2 border-gray-300">
                <input
                  type="number"
                  placeholder="Otro monto"
                  value={customMonto}
                  onChange={handleCustomMonto}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mb-6">
                    <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="correo" className="block text-sm font-medium mb-2">
                      Correo electrónico:
                    </label>
                    <input
                      type="email"
                      id="correo"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>

              {/** Selección del sector */}
              <div className="mb-6">
                <label htmlFor="sector" className="block text-sm font-medium mb-2 text-black">
                  Selecciona el sector al que quieres apoyar:
                </label>
                <select
                  id="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="1">Agua</option>
                  <option value="2">Educación sexual</option>
                  <option value="3">Nutrición</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="comentario" className="block text-sm font-medium mb-2 text-black">
                  Comentario:
                </label>
                <textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  rows={4}
                />
              </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {finalMonto && parseFloat(finalMonto as string) > 0 && (
              <div className="mt-8">
                <PayPalPayment 
                  monto={finalMonto} 
                  donorId={user ? user.id : undefined}
                  email={correo}
                  sectorId={sector}
                  comentario={comentario}
                  name={nombre}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonacionInvitado;
