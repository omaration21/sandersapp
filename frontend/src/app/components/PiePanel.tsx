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
    if (donation.sector_id === 1) {
      sectorTotals.sector1 += amount;
    } else if (donation.sector_id === 2) {
      sectorTotals.sector2 += amount;
    } else if (donation.sector_id === 3) {
      sectorTotals.sector3 += amount;
    }
  });

  // Prepare data for the Pie chart
  const chartData = {
    labels: ["Sector 1", "Sector 2", "Sector 3"], // Names of the sectors
    datasets: [
      {
        label: "Donations by Sector",
        data: [
          (sectorTotals.sector1 / totalDonations) * 100 || 0, // Percentage for Sector 1
          (sectorTotals.sector2 / totalDonations) * 100 || 0, // Percentage for Sector 2
          (sectorTotals.sector3 / totalDonations) * 100 || 0, // Percentage for Sector 3
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for the sectors
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
        text: "Donations by Sector",
      },
    },
  };

  return (
    <div style={styles.container}>
      <Pie data={chartData} options={chartOptions} /> {/* Render the Pie chart */}
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    display: "flex",                
    justifyContent: "center",       
    alignItems: "center",         
    width: "40%",
    height: "100%",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default PiePanel;