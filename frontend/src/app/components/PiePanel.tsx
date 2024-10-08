import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { fetchDonations, DonationData } from "../services/api"; // Import fetchDonations and DonationData
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Define the PiePanel component
const PiePanel: React.FC = () => {
  // State to store donations fetched from the API
  const [donations, setDonations] = useState<DonationData[]>([]);

  // Fetch donations when the component mounts
  useEffect(() => {
    async function loadDonations() {
      try {
        const fetchedDonations = await fetchDonations(); // Use the same method as in IncomePanel
        setDonations(fetchedDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    }

    loadDonations();
  }, []);

  // Group donations by sector (3 sectors) and calculate percentages
  const sectorTotals = { sector1: 0, sector2: 0, sector3: 0 };
  let totalDonations = 0;

  donations.forEach((donation) => {
    // Ensure donation.amount is treated as a number
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

  // Prepare data for the Pie chart
  const chartData = {
    labels: ["Agua", "Educación sexual", "Nutrición"], // Names of the sectors
    datasets: [
      {
        label: "Monto total recaudado",
        data: [
          (sectorTotals.sector1 / totalDonations) * 100 || 0, // Percentage for Sector 1
          (sectorTotals.sector2 / totalDonations) * 100 || 0, // Percentage for Sector 2
          (sectorTotals.sector3 / totalDonations) * 100 || 0, // Percentage for Sector 3
        ],
        backgroundColor: ["#232959", " #3E4A97", "#1B1F47"], // Colors for the sectors
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Configuration for the Pie chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Donaciones por sector",
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-1/2 h-full p-5 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg transition-colors">
      <Pie data={chartData} options={chartOptions} /> {/* Render the Pie chart */}
    </div>
  );
};

export default PiePanel;