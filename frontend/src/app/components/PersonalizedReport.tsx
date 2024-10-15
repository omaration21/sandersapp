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

       // Calcular el monto total
      const totalAmount = filteredDonations.reduce(
        (sum, donation) => sum + Number(donation.amount || 0), 0
      );

      const pdf = new jsPDF();
      const img = new Image();
      img.src = '/images/logo.png';
      img.onload = function () {
        pdf.addImage(img, 'PNG', 10, 10, 50, 40);
        const formattedStartDate = startDate.toLocaleDateString();
        const formattedEndDate = endDate.toLocaleDateString();
        pdf.setFontSize(20);
        pdf.setTextColor(35, 41, 89);
        pdf.text(`Reporte de Donaciones Recibidas`, 70, 20);
        pdf.setFontSize(12);
        pdf.text(`Del ${formattedStartDate} al ${formattedEndDate}`, 90, 30);

        autoTable(pdf, {
          head: [['Fecha', 'Donante', 'Monto']],
          body: filteredDonations.map(donation => [
            new Date(donation.date || "").toLocaleDateString(),
            donation.donor_name || 'Nombre no disponible',
            `$${donation.amount ? donation.amount.toString() : '0'}`
          ]),
          startY: 50,
          headStyles: {
            fillColor: [35, 41, 89],
            textColor: [255, 255, 255],
          }
        });

        const finalY = 3.6 * (filteredDonations.length);
        console.log(finalY);

        pdf.setFontSize(14);
        pdf.setTextColor(35, 41, 89);
        pdf.text(`Monto total: $${totalAmount.toFixed(2)}`, 140, finalY);

        pdf.save('reporte-donaciones.pdf');
      };
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
  
      let csvContent = "Fecha,Donante,Monto\r\n";
  
      filteredDonations.forEach(donation => {
        const row = [
          new Date(donation.date || "").toLocaleDateString(),
          donation.donor_name || 'Nombre no disponible',
          `$${donation.amount ? parseFloat(donation.amount).toFixed(2) : '0.00'}`
        ].join(",");
        csvContent += row + "\r\n";
      });
  
      const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "reporte-donaciones.csv");
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al exportar CSV:', error);
    }
  };
  

  return (
    <div className="bg-white dark:bg-gray-900 p-6 mt-10 rounded-lg shadow-lg transition-colors">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Generar reporte personalizado</h1>
      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300">Fecha de inicio:</label>
        <DatePicker
          className="form-input w-full text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          selected={startDate}
          onChange={date => setStartDate(date || new Date())}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300">Fecha de fin:</label>
        <DatePicker
          className="form-input w-full text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          selected={endDate}
          onChange={date => setEndDate(date || new Date())}
        />
      </div>
      <button
        className="px-4 py-2 bg-[#232959] hover:bg-[#778DA9] dark:bg-[#232959] dark:hover:bg-gray-800 text-white font-semibold rounded shadow mr-4"
        onClick={handleGenerateReport}
      >
        Descargar PDF
      </button>
      <button
        className="px-4 py-2 bg-[#232959] hover:bg-[#778DA9] dark:bg-[#232959] dark:hover:bg-gray-800 text-white font-semibold rounded shadow"
        onClick={handleExportCSV}
      >
        Descargar CSV
      </button>
    </div>
  );
};

export default PersonalizedReport;
