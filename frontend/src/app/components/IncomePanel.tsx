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
          // Normalizamos las dates eliminando la información de hora y zona horaria
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
        
          // Comparamos solo la parte del día, mes y año
          return normalizedDonationDate.getTime() === normalizedNow.getTime();
        });
        break;

      case "Semanalmente":
        // Get the first day of the week (Sunday)
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
    // Ensure donation.amount is a number
    const total = filtered.reduce((acc: number, donation: DonationData) => {
      // Ensure donation.amount is a number before adding it
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
    // Dates on the X-axis
    labels: filteredDonations.map((donation) =>
      new Date(donation.date || "").toLocaleDateString()
    ),
    datasets: [
      {
        label: "Donación",
        // Amount on the Y-axis
        data: filteredDonations.map((donation) => donation.amount),
        // Bar colors
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        // Bar border colors
        borderColor: "rgba(75, 192, 192, 1)",
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
          // Now the X-axis shows the date
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          // The Y-axis shows the donation amount
          text: 'Monto de donación (MXN)',
        },
      },
    },
  };

  return (
      <div style={styles.panelContainer}>
        <h2 style={styles.title}>Ingresos</h2>

        {/* Filter options as a dropdown */}
        <div style={styles.filterContainer}>
          <label htmlFor="filterSelect">Filtrado por:</label>
          <select
            id="filterSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterOption)}
            style={styles.select}
          >
            <option value="Diariamente">Diariamente</option>
            <option value="Semanalmente">Semanalmente</option>
            <option value="Mensualmente">Mensualmente</option>
          </select>
        </div>

        {/* Display bar chart instead of listing donations */}
        <div style={styles.chartContainer}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
  );
};

// CSS styles for the box with rounded edges and black text color
const styles = {
  panelContainer: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "55%",
    height: "100%",
    color: "black"
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  filterContainer: {
    marginBottom: "20px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginLeft: "10px",
    fontSize: "16px",
  },
  chartContainer: {
    marginTop: "20px"
  },
};

export default IncomePanel;