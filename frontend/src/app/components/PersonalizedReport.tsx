import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { fetchDonations } from '../services/api';
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const PersonalizedReport = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleGenerateReport = async () => {
      try {
        const donations = await fetchDonations();
        const filteredDonations = donations.filter(donation => {
          const donationDate = new Date(donation.date || "");
          return donationDate >= startDate && donationDate <= endDate;
        });

        const pdf = new jsPDF();
        autoTable(pdf, {
          head: [['Fecha', 'Donante', 'Monto']],
          body: filteredDonations.map(donation => [
            new Date(donation.date || "").toLocaleDateString(),
            donation.donor_name || 'Nombre no disponible',
            donation.amount ? donation.amount.toString() : '0'
          ]),
        });
        pdf.save('reporte-donaciones.pdf');
      } catch (error) {
        console.error('Error al generar el reporte:', error);
      }
    };

    const handleExportCSV = async () => {
      try {
        const donations = await fetchDonations();
        const filteredDonations = donations.filter(donation => {
          const donationDate = new Date(donation.date || "");
          return donationDate >= startDate && donationDate <= endDate;
        });

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Fecha,Donante,Monto\r\n"; // Cabecera del CSV
        filteredDonations.forEach(donation => {
          const row = [
            new Date(donation.date || "").toLocaleDateString(),
            donation.donor_name || 'Nombre no disponible',
            donation.amount || '0'
          ].join(",");
          csvContent += row + "\r\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reporte-donaciones.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al exportar CSV:', error);
      }
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-900 p-6 mt-10 rounded-lg shadow-lg transition-colors">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Generar reporte personalizado</h1>
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300">Fecha de inicio:</label>
          <DatePicker
            className="form-input w-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            selected={startDate}
            onChange={date => setStartDate(date || new Date())}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-300">Fecha de fin:</label>
          <DatePicker
            className="form-input w-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            selected={endDate}
            onChange={date => setEndDate(date || new Date())}
          />
        </div>
        <button
          className="px-4 py-2 bg-red-600 dark:bg-red-600 text-white font-semibold rounded shadow mr-4"
          onClick={handleGenerateReport}
        >
          Descargar PDF
        </button>
        <button
          className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white font-semibold rounded shadow"
          onClick={handleExportCSV}
        >
          Descargar CSV
        </button>
      </div>
    );
  };

export default PersonalizedReport;