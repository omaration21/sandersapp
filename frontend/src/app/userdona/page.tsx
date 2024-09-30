"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Importamos Link para los enlaces

const DonacionInvitado = () => {
  const [monto, setMonto] = useState<number | string>(''); // Inicia vacío para forzar selección
  const [customMonto, setCustomMonto] = useState<string>(''); // Para almacenar el monto personalizado
  const [error, setError] = useState<string | null>(null);

  const handleMontoClick = (montoSeleccionado: number) => {
    // Si el monto seleccionado ya está activo, limpiarlo
    if (monto === montoSeleccionado) {
      setMonto('');
    } else {
      setMonto(montoSeleccionado);
      setCustomMonto(''); // Limpiar el monto personalizado si se selecciona una opción predefinida
      setError(null); // Quitar el error si se seleccionó una opción válida
    }
  };

  const handleCustomMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMonto(e.target.value);
    setMonto(''); // Limpiar las selecciones predefinidas si se introduce un monto personalizado
    setError(null); // Quitar el error si se introduce un monto válido
  };

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();

    const finalMonto = monto || customMonto; 
    if (!finalMonto || parseFloat(finalMonto as string) <= 0) {
      setError('Por favor, introduce un monto válido.');
      return;
    }

    // Aquí puedes agregar lógica para manejar la donación.
    alert(`Gracias por tu donación de $${finalMonto}.`);
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
                Login
              </button>
            </Link>
            {/* Botón SignUp */}
            <Link href="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                SignUp
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido principal de la donación */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Bloque centrado */}
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg relative text-center">
          {/* Imagen de encabezado con transparencia */}
          <div className="relative w-full h-72 mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: "url('/images/waterF.jpg')" }}
            ></div>
            <div className="relative flex items-center justify-center h-full">
              <h1 className="text-[#202440] text-4xl font-bold z-5">Dona ahora!</h1>
            </div>
          </div>

          {/* Título y descripción */}
          <h2 className="text-[#202451] text-2xl font-semibold text-center mb-10">Su donación ayudará a proporcionar agua a quienes más la necesitan</h2>

          {/* Botones de monto y campo de monto personalizado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => handleMontoClick(50)}
              className={`p-4 rounded-lg text-center ${monto === 50 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
            >
              <h3 className="text-xl font-semibold">$50</h3>
              <p>Podría comprar kits portátiles de análisis de agua para las comunidades</p>
            </button>
            <button
              onClick={() => handleMontoClick(150)}
              className={`p-4 rounded-lg text-center ${monto === 150 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
            >
              <h3 className="text-xl font-semibold">$150</h3>
              <p>Podría abastecer a un pueblo con filtración de agua durante todo un año</p>
            </button>
            <button
              onClick={() => handleMontoClick(250)}
              className={`p-4 rounded-lg text-center ${monto === 250 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
            >
              <h3 className="text-xl font-semibold">$250</h3>
              <p>Podría construir un sistema de agua sostenible para una aldea remota</p>
            </button>
            <button
              onClick={() => handleMontoClick(500)}
              className={`p-4 rounded-lg text-center ${monto === 500 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
            >
              <h3 className="text-xl font-semibold">$500</h3>
              <p>Podría proporcionar agua potable a una familia durante un mes</p>
            </button>
            <button
              onClick={() => handleMontoClick(1000)}
              className={`p-4 rounded-lg text-center ${monto === 1000 ? 'bg-[#202451] text-white' : 'bg-[#778DA9] text-white'}`}
            >
              <h3 className="text-xl font-semibold">$1000</h3>
              <p>Podría apoyar la construcción de nuevos pozos en zonas con escasez de agua</p>
            </button>
            {/* Espacio para otro monto */}
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

          {/* Mostrar error si aplica */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Botones de pago */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDonation}
              className="w-full md:w-1/3 bg-[#202451] text-white py-3 rounded-lg hover:bg-[#778DA9]"
            >
              Donar con Tarjeta de Crédito
            </button>

            {/* Botón de PayPal con espacio para el logo */}
            <button
              onClick={handleDonation}
              className="w-full md:w-1/3 bg-[#202451] text-white py-3 rounded-lg hover:bg-[#778DA9] flex justify-center items-center"
            >
              <img src="/images/paypal.webp" alt="PayPal Logo" className="h-6 mr-2" /> Donar con PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonacionInvitado;
