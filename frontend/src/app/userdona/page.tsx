"use client";

import React, { useState } from 'react';
import PayPalPayment from '../components/PayPalPayment';

const DonacionInvitado = () => {
  const [monto, setMonto] = useState<number | string>(''); // Inicia vacío para forzar selección
  const [customMonto, setCustomMonto] = useState<string>(''); // Para almacenar el monto personalizado
  const [sector, setSector] = useState<string>(''); // Para almacenar el sector seleccionado
  const [comentario, setComentario] = useState<string>(''); // Nuevo estado para el comentario
  const [error, setError] = useState<string | null>(null);

  const handleMontoClick = (montoSeleccionado: number) => {
    if (monto === montoSeleccionado) {
      setMonto('');
    } else {
      setMonto(montoSeleccionado);
      setCustomMonto(''); // Limpiar el monto personalizado si se selecciona una opción predefinida
      setError(null);
    }
  };

  const handleCustomMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMonto(e.target.value);
    setMonto('');
    setError(null);
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSector(e.target.value);
    setError(null);
  };

  const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(e.target.value);
  };

  const finalMonto = monto || customMonto;

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center relative">
      {/* Fondo con gradiente y imagen */}
      <div
        style={{
          background: 'linear-gradient(to top right, #ffff 40%, transparent), url(/images/hands.jpg) center/cover no-repeat',
        }}
        className="absolute top-0 left-0 w-full h-full"
      ></div>

      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg relative z-10">
        {/* Columna izquierda con título y imagen */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-[#f7f7f7] p-10">
          <h1 className="text-4xl font-bold text-[#202440] mb-10 text-center">
            ¡Únete a la causa!
          </h1>
          <img
            src="/images/boy.jpg" // Cambia esta ruta a tu imagen preferida
            alt="Cause illustration"
            className="max-w-full h-auto object-cover"
          />
        </div>

        {/* Columna derecha con botones de acción y PayPal */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          {/* Descripción */}
          <h2 className="text-[#202451] text-2xl font-semibold mb-6 text-center">
            Tu donación ayudará a nuestras causas en agua, educación sexual y alimentación.
          </h2>

          {/* Menú desplegable para seleccionar el sector */}
          <div className="mb-6">
            <label htmlFor="sector" className="block text-gray-700 text-lg font-medium mb-2">
              Selecciona el sector al que deseas donar:
            </label>
            <select
              id="sector"
              value={sector}
              onChange={handleSectorChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="agua">Agua</option>
              <option value="alimentacion">Alimentación</option>
              <option value="educacion_sexual">Educación Sexual</option>
            </select>
          </div>

          {/* Botones de monto */}
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

          {/* Campo de texto para los comentarios */}
          <div className="mb-6">
            <label htmlFor="comentario" className="block text-gray-700 text-lg font-medium mb-2">
              Escribe un comentario (opcional):
            </label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={handleComentarioChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Escribe aquí tu comentario..."
            ></textarea>
          </div>

          {/* Mostrar el botón de PayPal solo si se seleccionó un monto válido, un sector y un comentario opcional */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {finalMonto && parseFloat(finalMonto as string) > 0 && sector && (
            <div className="mt-8">
              <PayPalPayment monto={finalMonto} sector={sector} comentario={comentario} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonacionInvitado;
