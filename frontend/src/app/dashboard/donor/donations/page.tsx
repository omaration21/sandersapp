"use client";

import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import PayPalPayment from "../../../components/PayPalPayment";
import { AuthContext } from "../../../context/AuthContext";
import { UpperBar } from 'src/app/components/UpperBar';
import { useRouter } from "next/navigation";

const DonacionUsuario = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [monto, setMonto] = useState<number | string>("");
  const [customMonto, setCustomMonto] = useState<string>("");
  const [sector, setSector] = useState<string>(""); // Nuevo estado para el sector
  const [comentario, setComentario] = useState<string>(""); // Nuevo estado para el comentario
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!authContext?.user) {
      router.push("/login");
    }
  }, [authContext, router]);

  if (!authContext?.user) {
    return null;
  }

  const { user } = authContext;

  const handleMontoClick = (montoSeleccionado: number) => {
    if (monto === montoSeleccionado) {
      setMonto("");
    } else {
      setMonto(montoSeleccionado);
      setCustomMonto("");
      setError(null);
    }
  };

  const handleCustomMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMonto(e.target.value);
    setMonto("");
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

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#141D32] transition-colors">
      {/* Barra superior */}
      <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-grow">
        {isSidebarOpen && <Sidebar />}
        <div className={`flex-1 p-10 ${isSidebarOpen ? "ml-64" : "ml-0"} mt-16`}>
          
            <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg relative transition-colors">
              <div className="md:w-1/2 flex flex-col justify-center items-center rounded-tl rounded-bl bg-[#f7f7f7] dark:bg-gray-700 p-10">
                <h1 className="text-4xl font-bold text-[#202440] dark:text-white mb-10 text-center">
                  ¡Únete a la causa!
                </h1>
                <img
                  src="/images/boy.jpg"
                  alt="Cause illustration"
                  className="max-w-full h-auto object-cover"
                />
              </div>

              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <h2 className="text-[#202451] dark:text-gray-200 text-2xl font-semibold mb-6 text-center">
                  Tu donación ayudará a nuestras causas en agua, educación sexual y alimentación.
                </h2>

                {/* Menú desplegable para seleccionar el sector */}
                <div className="mb-6">
                  <label htmlFor="sector" className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2">
                    Selecciona el sector al que deseas donar:
                  </label>
                  <select
                    id="sector"
                    value={sector}
                    onChange={handleSectorChange}
                    className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="agua">Agua</option>
                    <option value="alimentacion">Alimentación</option>
                    <option value="educacion_sexual">Educación Sexual</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <button
                    onClick={() => handleMontoClick(50)}
                    className={`p-4 rounded-lg text-center ${monto === 50 ? "bg-[#202451] text-white" : "bg-[#778DA9] text-white dark:bg-gray-600 dark:text-gray-300"}`}
                  >
                    <h3 className="text-xl font-semibold">$50</h3>
                    <p>Apoya la compra de kits de análisis de agua</p>
                  </button>
                  <button
                    onClick={() => handleMontoClick(150)}
                    className={`p-4 rounded-lg text-center ${monto === 150 ? "bg-[#202451] text-white" : "bg-[#778DA9] text-white dark:bg-gray-600 dark:text-gray-300"}`}
                  >
                    <h3 className="text-xl font-semibold">$150</h3>
                    <p>Contribuye a la educación sexual en comunidades rurales</p>
                  </button>
                  <button
                    onClick={() => handleMontoClick(250)}
                    className={`p-4 rounded-lg text-center ${monto === 250 ? "bg-[#202451] text-white" : "bg-[#778DA9] text-white dark:bg-gray-600 dark:text-gray-300"}`}
                  >
                    <h3 className="text-xl font-semibold">$250</h3>
                    <p>Ayuda a proporcionar alimentación sostenible</p>
                  </button>
                  <button
                    onClick={() => handleMontoClick(500)}
                    className={`p-4 rounded-lg text-center ${monto === 500 ? "bg-[#202451] text-white" : "bg-[#778DA9] text-white dark:bg-gray-600 dark:text-gray-300"}`}
                  >
                    <h3 className="text-xl font-semibold">$500</h3>
                    <p>Brinda agua potable a una familia durante un mes</p>
                  </button>
                  <button
                    onClick={() => handleMontoClick(1000)}
                    className={`p-4 rounded-lg text-center ${monto === 1000 ? "bg-[#202451] text-white" : "bg-[#778DA9] text-white dark:bg-gray-600 dark:text-gray-300"}`}
                  >
                    <h3 className="text-xl font-semibold">$1000</h3>
                    <p>Apoya la construcción de pozos en comunidades sin acceso al agua</p>
                  </button>
                  <div className="p-4 rounded-lg text-center bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600">
                    <input
                      type="number"
                      placeholder="Otro monto"
                      value={customMonto}
                      onChange={handleCustomMonto}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Campo de texto para los comentarios */}
                <div className="mb-6">
                  <label htmlFor="comentario" className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2">
                    Escribe un comentario (opcional):
                  </label>
                  <textarea
                    id="comentario"
                    value={comentario}
                    onChange={handleComentarioChange}
                    className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                    rows={4}
                    placeholder="Escribe aquí tu comentario..."
                  ></textarea>
                </div>

                {error && <p className="text-red-500 dark:text-red-400 text-center mb-4">{error}</p>}

                {finalMonto && parseFloat(finalMonto as string) > 0 && sector && (
                  <div className="mt-8">
                    <PayPalPayment
                      monto={finalMonto}
                      sector={sector} // Pasamos el sector seleccionado a PayPalPayment
                      comentario={comentario} // Pasamos el comentario a PayPalPayment
                      donorId={user.id}
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
