import React, { useState, useEffect } from "react";
import { fetchDonations, DonationData } from "../services/api"; // Import the existing method

// Define the RecentDonations component
const RecentDonations: React.FC = () => {
  // State to store the last 3 donations fetched from the API
  const [recentDonations, setRecentDonations] = useState<DonationData[]>([]);

  // Fetch donations and get the last 3 donations
  useEffect(() => {
    async function loadDonations() {
      try {
        const fetchedDonations = await fetchDonations(); // Fetch all donations
        // Sort donations by date and get the last 3 donations
        const lastThreeDonations = fetchedDonations
          .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
          .slice(0, 3); // Take only the last 3 donations
        setRecentDonations(lastThreeDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    }

    loadDonations();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 mt-10 rounded-lg shadow-md transition-colors">
      <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">Donaciones recientes</h2>
      <ul className="list-none p-0 text-black dark:text-white">
        {recentDonations.map((donation) => (
          <li
            key={donation.id}
            className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md transition-colors"
          >
            <p><strong>Nombre:</strong> {donation.donor_name}</p>
            <p><strong>Monto:</strong> ${donation.amount}</p>
            <p><strong>Fecha:</strong> {new Date(donation.date || "").toLocaleDateString()}</p>
            <p><strong>Sector:</strong> {donation.sector_name}</p>
            <p><strong>Comentario:</strong> {donation.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentDonations;