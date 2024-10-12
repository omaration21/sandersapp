import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DonationData, getDonationsByUser } from "../services/api";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const LastDonations = () => {
  const { user } = useAuth(); // Obtenemos el usuario autenticado desde el contexto
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Manejo de error tipado

  useEffect(() => {
    if (user && user.id) {
      // Llamamos al método para obtener las donaciones por usuario
      getDonationsByUser(user.id)
        .then((data) => {
          // Guardamos las últimas 3 donaciones
          setDonations(data.slice(0, 3));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDownloadPDF = async () => {
    if (user && user.id) {
      try {
        const allDonations = await getDonationsByUser(user.id);
        const pdf = new jsPDF();
        const img = new Image();
        img.src = '/images/logo.png';  
        img.onload = function () {
        pdf.addImage(img, 'PNG', 10, 10, 50, 40);
        pdf.setFontSize(20);  
        pdf.setTextColor(35, 41, 89);  
        pdf.text(`Reporte de Donaciones Realizadas`, 70, 20); 
        pdf.setFontSize(16); 
        const donorName = user.name || 'Nombre no disponible';
        pdf.text(`Por el donante: ${donorName}`, 95, 35);  
        autoTable(pdf, {
          head: [["Fecha", "Sector", "Monto", "Comentario"]],
          body: allDonations.map((donation) => [
            new Date(donation.date || "").toLocaleDateString(),
            donation.sector_name || "No especificado",
            `$${donation.amount}`,
            donation.comment || "Sin comentario",
          ]),
          startY: 50,
          headStyles: {
            fillColor: [35, 41, 89],
            textColor: [255,255,255],
          }
        });
        pdf.save("historial-donaciones.pdf");
        };
      } catch (error) {
        console.error("Error al generar el PDF:", error);
      }
    }
  };

  const handleDownloadCSV = async () => {
    if (user && user.id) {
      try {
        const allDonations = await getDonationsByUser(user.id);
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Fecha, Sector, Monto, Comentario\r\n"; // Cabecera del CSV
        allDonations.forEach((donation) => {
          const row = [
            new Date(donation.date || "").toLocaleDateString(),
            donation.sector_name || "No especificado",
            `$${donation.amount}`,
            donation.comment || "Sin comentario",
          ].join(",");
          csvContent += row + "\r\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "historial-donaciones.csv");
        document.body.appendChild(link); // Requerido para Firefox
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error al exportar CSV:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-gray-700 dark:text-white">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400">Error: {error}</div>;
  }

  if (!donations.length) {
    return <div className="text-gray-700 dark:text-white">No hay donaciones para mostrar.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-colors">
      <h3 className="text-2xl font-semibold mb-6 text-black dark:text-white">Tus últimas donaciones</h3>
      <ul className="list-none p-0">
        {donations.map((donation) => (
          <li
            key={donation.id}
            className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md transition-colors"
          >
            {/* Monto grande y llamativo */}
            <p className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-2">${donation.amount}</p>
            
            {/* Sector y fecha */}
            <p className="text-sm text-gray-600 dark:text-white">
              {new Date(donation.date || "").toLocaleDateString()} | {donation.sector_name}
            </p>
            
            {/* Comentario (sin cursiva) */}
            {donation.comment && (
              <p className="mt-2 text-sm text-gray-700 dark:text-white">
                {donation.comment}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Botones para descargar el historial */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Obtener mi historial completo de donaciones
        </h3>
        <button
            className="px-4 py-2 bg-[#232959] hover:bg-[#778DA9] dark:bg-[#232959] dark:hover:bg-gray-800 text-white font-semibold rounded shadow mr-4"
            onClick={handleDownloadPDF}>
            Descargar PDF
        </button>
        <button
            className="px-4 py-2 bg-[#232959] hover:bg-[#778DA9] dark:bg-[#232959] dark:hover:bg-gray-800 text-white font-semibold rounded shadow"
            onClick={handleDownloadCSV}>
            Descargar CSV
        </button>
        </div>
    </div>
  );
};

export default LastDonations;