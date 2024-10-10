import React, { useState, useEffect } from "react";
import { fetchDonations, DonationData } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type FilterOption = "Diariamente" | "Semanalmente" | "Mensualmente";

const IncomePanel: React.FC = () => {
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<DonationData[]>([]);
  const [filter, setFilter] = useState<FilterOption>("Mensualmente");
  const [totalAmount, setTotalAmount] = useState<number>(0);
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

  useEffect(() => {
    filterDonations(filter);
  }, [filter, donations]);

  const filterDonations = (filterOption: FilterOption) => {
    const now = new Date();
    let filtered: DonationData[] = [];

    switch (filterOption) {
      case "Diariamente":
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.date || "");
          const normalizedDonationDate = new Date(
            donationDate.getUTCFullYear(),
            donationDate.getUTCMonth(),
            donationDate.getUTCDate()
          );
          const normalizedNow = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate()
          );
          return normalizedDonationDate.getTime() === normalizedNow.getTime();
        });
        break;
      case "Semanalmente":
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.date || "");
          const nowDate = new Date();
          return donationDate >= startOfWeek && donationDate <= nowDate;
        });
        break;
      case "Mensualmente":
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.date || "");
          return (
            donationDate.getMonth() === now.getMonth() &&
            donationDate.getFullYear() === now.getFullYear()
          );
        });
        break;
      default:
        filtered = donations;
        break;
    }

    setFilteredDonations(filtered);

    const total = filtered.reduce((acc, donation) => {
      const amount = typeof donation.amount === "string" ? parseFloat(donation.amount) : donation.amount;
      return acc + (amount || 0);
    }, 0);
    setTotalAmount(total);
  };

  const chartData = {
    labels: filteredDonations.map((donation) =>
      new Date(donation.date || "").toLocaleDateString()
    ),
    datasets: [
      {
        label: "Donaciones",
        data: filteredDonations.map((donation) => donation.amount),
        backgroundColor: isDarkMode ? "#3E4A97" : "rgba(31, 36, 77, 0.5)",
        borderColor: isDarkMode ? "#3E4A97" : "rgba(31, 36, 77, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      },
      title: {
        display: true,
        text: `Donaciones (${filter.charAt(0).toUpperCase() + filter.slice(1)})`,
        color: isDarkMode ? "#ffffff" : "#000000",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha",
          color: isDarkMode ? "#FFFFFF" : "#000000",
        },
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000",
          autoSkip: true,
          maxTicksLimit: 5
        },
      },
      y: {
        title: {
          display: true,
          text: "Monto de donación (MXN)",
          color: isDarkMode ? "#ffffff" : "#000000",
        },
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000",
        },
      },
    },
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-md transition-colors w-3/4 h-full`}>
      <h2 className="text-2xl font-semibold mb-4">Ingresos</h2>
      <div className="mb-4">
        <label htmlFor="filterSelect">Filtrado por:</label>
        <select
          id="filterSelect"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterOption)}
          className="ml-2 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="Diariamente">Diariamente</option>
          <option value="Semanalmente">Semanalmente</option>
          <option value="Mensualmente">Mensualmente</option>
        </select>
      </div>

      <div className="mt-6">
        <Bar data={chartData} options={chartOptions} />
        <h2 className="text-2xl font-semibold mt-4 p-8">Ingresos totales: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default IncomePanel;