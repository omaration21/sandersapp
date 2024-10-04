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
          .sort((a, b) => new Date(b.fecha || "").getTime() - new Date(a.fecha || "").getTime())
          .slice(0, 3); // Take only the last 3 donations
        setRecentDonations(lastThreeDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    }

    loadDonations();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Recent Donations</h2>
      <ul style={styles.list}>
        {recentDonations.map((donation) => (
          <li key={donation.id} style={styles.donation}>
            <p><strong>Donor ID:</strong> {donation.donor_id}</p>
            <p><strong>Amount:</strong> ${donation.amount}</p>
            <p><strong>Date:</strong> {new Date(donation.fecha || "").toLocaleDateString()}</p>
            <p><strong>Sector ID:</strong> {donation.sector_id}</p>
            <p><strong>Comment:</strong> {donation.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    width: '100%', // Full width
    backgroundColor: '#f9f9f9',
    padding: '20px',
    marginTop: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'black', // Set text color to black
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    color: 'black', // Set text color to black
  },
  donation: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
    color: 'black', // Set text color to black
  },
};

export default RecentDonations;