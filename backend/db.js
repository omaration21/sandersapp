import mysql from 'mysql2';

// Function to connect to the database with the credentials
async function connection_to_db() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'r922006dmkh',
        database: 'sanders_db'
    });
};

// Export the function
export default connection_to_db();