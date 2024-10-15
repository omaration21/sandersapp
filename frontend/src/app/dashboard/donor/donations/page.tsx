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
  const [error, setError] = useState<string | null>(null);

  const [sector, setSector] = useState<string>("1");
  const [comentario, setComentario] = useState<string>("");

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

  const finalMonto = monto || customMonto;

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-[#141D32] transition-colors">
      <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-grow">
        {isSidebarOpen && <Sidebar />}
        <div className={`flex justify-center items-center min-h-screen flex-1 p-10 ${isSidebarOpen ? "ml-64" : "ml-0"} mt-16`}>
          
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

              <div className="mb-6">
                <label htmlFor="sector" className="block text-sm font-medium mb-2 dark:text-white">
                  Selecciona el sector al que quieres apoyar:
                </label>
                <select
                  id="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="1">Agua</option>
                  <option value="2">Educación sexual</option>
                  <option value="3">Nutrición</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="comentario" className="block text-sm font-medium mb-2 dark:text-white">
                  Comentario:
                </label>
                <textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  rows={4}
                />
              </div>

                {error && <p className="text-red-500 dark:text-red-400 text-center mb-4">{error}</p>}

                {finalMonto && parseFloat(finalMonto as string) > 0 && (
                  <div className="mt-8">
                    <PayPalPayment
                      email={user.email}
                      monto={finalMonto}
                      donorId={user.id}
                      sectorId={sector}
                      comentario={comentario}
                      name={user.name}
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