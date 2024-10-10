import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASS || 'your_password', 
    database: process.env.DB_NAME || 'sanders_db', 
};

class DonationsModel {
    static async registerNewDonation(amount, donor_id, type_id, comment, sector_id) {
        let connection = null;
    
        try {
            connection = await mysql.createConnection(config);
    
            await connection.query(
                'INSERT INTO donations (amount, donor_id, type_id, comment, sector_id) VALUES (?, ?, ?, ?, ?)',
                [amount, donor_id, type_id, comment, sector_id]
            );
    
            return true;
    
        } catch (error) {
            console.log('Error in register new donation: ', error);
            return false;
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }

    static async registerNewDonationAuthenticated(amount, donor_id, type_id, comment, sector_id) {
        let connection = null;
    
        try {
            connection = await mysql.createConnection(config);
    
            await connection.query(
                'INSERT INTO donations (amount, donor_id, type_id, comment, sector_id) VALUES (?, ?, ?, ?, ?)',
                [amount, donor_id, type_id, comment, sector_id]
            );
    
            return true;
    
        } catch (error) {
            console.log('Error in register new authenticated donation: ', error);
            return false;
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }

    static async registerAnonymousDonation(amount, donor_email, type_id, comment, sector_id) {
        let connection = null;

        try {
            connection = await mysql.createConnection(config);

            await connection.query(
                'INSERT INTO donations (amount, donor_id, donor_email, type_id, comment, sector_id) VALUES (?, NULL, ?, ?, ?, ?)',
                [amount, donor_email, type_id, comment, sector_id]
            );

            return true;

        } catch (error) {
            console.log('Error in register new donation: ', error);
            return false;
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }

    static async getAll() {
        let connection = null;

        try {
            connection = await mysql.createConnection(config);

            const [donations] = await connection.query(
                `SELECT 
                d.id,
                d.amount,
                COALESCE(u.name, 'Anónimo') AS donor_name,
                d.comment,
                s.description AS sector_name,
                dt.description AS type_name,
                d.date
                FROM donations d
                LEFT JOIN users u ON d.donor_id = u.id
                JOIN sectors s ON d.sector_id = s.id
                JOIN donation_types dt ON d.type_id = dt.id
                ORDER BY d.date`
            );

            return donations;
        } catch (error) {
            console.log('Error fetching donations: ', error);
            return [];
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }
}

export { DonationsModel };
