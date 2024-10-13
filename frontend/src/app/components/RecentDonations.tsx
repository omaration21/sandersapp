import React, { useState, useEffect } from "react";
import { fetchDonations, DonationData } from "../services/api";

// Define the RecentDonations component
const RecentDonations: React.FC = () => {
  const [recentDonations, setRecentDonations] = useState<DonationData[]>([]);

  useEffect(() => {
    async function loadDonations() {
      try {
        const fetchedDonations = await fetchDonations();
        const lastThreeDonations = fetchedDonations
          .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
          .slice(0, 3); // Get the last 3 donations
        setRecentDonations(lastThreeDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    }
    loadDonations();
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 p-6 mt-10 rounded-lg shadow-md transition-colors">
      <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">Donaciones recientes</h2>
      <ul className="list-none p-0">
        {recentDonations.map((donation) => (
          <li
            key={donation.id}
            className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md transition-colors"
          >
            {/* Nombre grande y llamativo */}
            <p className="text-2xl font-bold text-black dark:text-white mb-2">{donation.donor_name}</p>
            
            {/* Monto grande y llamativo */}
            <p className="text-2xl font-semibold text-green-700 dark:text-green-700 mb-2">${donation.amount}</p>
            
            {/* Fecha y Sector en blanco en modo oscuro */}
            <p className="text-sm text-gray-600 dark:text-white">
              {new Date(donation.date || "").toLocaleDateString()} | {donation.sector_name}
            </p>
            
            {/* Comentario (sin cursiva) */}
            {donation.comment && (
              <p className="mt-2 text-sm text-gray-700 dark:text-white">
                {donation.comment}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentDonations;