"use client";

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Sidebar from '../../../components/Sidebar';
import PayPalPayment from '../../../components/PayPalPayment';
import Cookies from 'js-cookie';

const DonacionUsuario = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Cargando...</div>;
  }

  const { user } = authContext;

  if (!user) {
    return <div>No se pudo cargar la información del usuario. Por favor, inicia sesión nuevamente.</div>;
  }

  const [monto, setMonto] = useState<number | string>('');
  const [customMonto, setCustomMonto] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

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

  const handleDonationSuccess = async (amount: number | string) => {
    if (!user || !user.id) {
      console.error("No se encontró el ID del usuario");
      alert("Hubo un problema con tu sesión. Por favor, inicia sesión nuevamente.");
      return;
    }
  
    const donationData = {
      amount: parseFloat(`${amount}`),
      donor_id: user.id,
      type_id: 2,
      comment: 'Donación realizada a través de PayPal',
      sector_id: 1,
    };
  
    try {
      const token = Cookies.get("token");
  
      if (!token) {
        console.error("No se encontró el token");
        alert("Tu sesión ha expirado, por favor inicia sesión nuevamente.");
        return;
      }
  
      const response = await fetch('https://localhost:5001/donations/registerDonation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(donationData),
      });
  
      console.log('Token usado:', token);
      console.log('Data enviada:', donationData);
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta del servidor:', errorText);
        alert(`Error al registrar la donación: ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      console.log('Donación registrada exitosamente:', data);
      alert('Donación registrada exitosamente');
    } catch (error) {
      console.error('Error registrando la donación:', error);
      alert('Hubo un problema registrando tu donación. Intenta de nuevo.');
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg relative">
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

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              {finalMonto && parseFloat(finalMonto as string) > 0 && (
                <div className="mt-8">
                  <PayPalPayment
                    monto={finalMonto}
                    donorId={user.id} // Pasar el ID del usuario autenticado
                    onSuccess={() => handleDonationSuccess(finalMonto)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonacionUsuario;
