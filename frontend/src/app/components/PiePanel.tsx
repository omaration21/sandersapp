import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { fetchDonations, DonationData } from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PiePanel: React.FC = () => {
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    return savedDarkMode === "true";
  });

  useEffect(() => {
    async function loadDonations() {
      try {
        const fetchedDonations = await fetchDonations();
        setDonations(fetchedDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    }

    loadDonations();
  }, []);

  const sectorTotals = { sector1: 0, sector2: 0, sector3: 0 };
  let totalDonations = 0;

  donations.forEach((donation) => {
    const amount = typeof donation.amount === 'string' ? parseFloat(donation.amount) : donation.amount;
    totalDonations += amount;
    if (donation.sector_name === "Agua") {
      sectorTotals.sector1 += amount;
    } else if (donation.sector_name === "Educación sexual") {
      sectorTotals.sector2 += amount;
    } else if (donation.sector_name === "Nutrición") {
      sectorTotals.sector3 += amount;
    }
  });

  const chartData = {
    labels: ["Agua", "Educación sexual", "Nutrición"],
    datasets: [
      {
        label: "Monto total recaudado",
        data: [
          (sectorTotals.sector1 / totalDonations) * 100 || 0,
          (sectorTotals.sector2 / totalDonations) * 100 || 0,
          (sectorTotals.sector3 / totalDonations) * 100 || 0,
        ],
        backgroundColor: ["#232959", "#3E4A97", "#1B1F47"],
        hoverBackgroundColor: ["#2f3870", "#4a5ab7", "#272e48"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000",
        }
      }
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center w-1/2 h-full p-5 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg transition-colors`}>
      <h2 className="text-xl font-semibold mb-3 p-4 text-center text-black dark:text-white">
        Donaciones por sector
      </h2>
      <div className="flex-grow p-5 w-full">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PiePanel;