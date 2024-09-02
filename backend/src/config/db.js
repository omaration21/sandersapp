import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Function to connect to the database with the credentials
async function connection_to_db() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            port: process.env.DB_PORT || 3306,
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'sanders_db'
        });
        console.log('Connected to the MySQL database');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; 
    }
};

export default connection_to_db;
