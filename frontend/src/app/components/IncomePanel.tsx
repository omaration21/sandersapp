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

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the filter options
type FilterOption = "daily" | "weekly" | "monthly";

const IncomePanel: React.FC = () => {
  const [donations, setDonations] = useState<DonationData[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<DonationData[]>([]);
  const [filter, setFilter] = useState<FilterOption>("daily");
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

  // Filter donations based on the selected filter (daily, weekly, monthly)
  const filterDonations = (filterOption: FilterOption) => {
    const now = new Date();
    let filtered: DonationData[] = [];

    switch (filterOption) {
      case "daily":
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.fecha || "");
          return (
            donationDate.getDate() === now.getDate() &&
            donationDate.getMonth() === now.getMonth() &&
            donationDate.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "weekly":
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Get the first day of the week (Sunday)
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.fecha || "");
          return donationDate >= startOfWeek && donationDate <= now;
        });
        break;

      case "monthly":
        filtered = donations.filter((donation) => {
          const donationDate = new Date(donation.fecha || "");
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

    // Calcular la cantidad total de donaciones para las donaciones filtradas
    const total = filtered.reduce((acc, donation) => acc + donation.amount, 0);
    setTotalAmount(total);
  };

  // Update filtered donations whenever the filter or donations change
  useEffect(() => {
    filterDonations(filter);
  }, [filter, donations]);

  // Preparar datos para el gráfico de barras
  const chartData = {
    labels: filteredDonations.map((donation) =>
      new Date(donation.fecha || "").toLocaleDateString()
    ), // Fechas en el eje Y
    datasets: [
      {
        label: "Donation Amount",
        data: filteredDonations.map((donation) => donation.amount), // Cantidad en el eje X
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Color de las barras
        borderColor: "rgba(75, 192, 192, 1)", // Color del borde de las barras
        borderWidth: 1,
      },
    ],
  };

  // Configuración del gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Donations (${filter.charAt(0).toUpperCase() + filter.slice(1)})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Donation Amount (USD)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2>Income Panel</h2>

      {/* Filter options as a dropdown */}
      <div style={styles.filterContainer}>
        <label htmlFor="filterSelect">Filter by:</label>
        <select
          id="filterSelect"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterOption)}
          style={styles.select}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Cuadro con bordes redondeados que muestra estadísticas */}
      <div style={styles.statsContainer}>
        <h3>Statistics</h3>
        <p><strong>Total Amount:</strong> ${totalAmount}</p>
        <p><strong>Filter:</strong> {filter.charAt(0).toUpperCase() + filter.slice(1)}</p>
        <p><strong>Total Donations:</strong> {filteredDonations.length}</p>
      </div>

      {/* Display bar chart instead of listing donations */}
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// Estilos CSS para el cuadro con bordes redondeados y color negro para el texto
const styles = {
  container: {
    color: "black", // Color de todas las letras a negro
  },
  filterContainer: {
    margin: "20px 0",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginLeft: "10px",
    fontSize: "16px",
  },
  statsContainer: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    margin: "20px 0",
  },
};

export default IncomePanel;