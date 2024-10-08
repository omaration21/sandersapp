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

// Define the filter options
type FilterOption = "Diariamente" | "Semanalmente" | "Mensualmente";

const IncomePanel: React.FC = () => {
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<DonationData[]>([]);
  const [filter, setFilter] = useState<FilterOption>("Diariamente");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Fetch all donations on component mount
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

  // Filter donations based on the selected filter
  const filterDonations = (filterOption: FilterOption) => {
    const now = new Date();
    let filtered: DonationData[] = [];

    switch (filterOption) {
      case "Diariamente":
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.date || "");
          const normalizedDonationDate = new Date(
            donationDate.getUTCFullYear(),
            donationDate.getUTCMonth() + 1,
            donationDate.getUTCDate()
          );
          const normalizedNow = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth() + 1, 
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

    // Calculate the total amount of donations for the filtered donations
    const total = filtered.reduce((acc: number, donation: DonationData) => {
      const amount = typeof donation.amount === 'string' ? parseFloat(donation.amount) : donation.amount;
      return acc + (amount || 0);
    }, 0);
    setTotalAmount(total);
  };

  // Update filtered donations whenever the filter or donations change
  useEffect(() => {
    filterDonations(filter);
  }, [filter, donations]);

  // Prepare data for the bar chart
  const chartData = {
    labels: filteredDonations.map((donation) =>
      new Date(donation.date || "").toLocaleDateString()
    ),
    datasets: [
      {
        label: "Donación",
        data: filteredDonations.map((donation) => donation.amount),
        backgroundColor: "rgba(31, 36, 77, 0.5)",
        borderColor: "rgba(31, 36, 77, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Donaciones (${filter.charAt(0).toUpperCase() + filter.slice(1)})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Monto de donación (MXN)',
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-md transition-colors w-3/4 h-full">
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
      </div>
    </div>
  );
};

export default IncomePanel;