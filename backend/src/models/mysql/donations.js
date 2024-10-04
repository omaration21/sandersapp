import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const saltRounds = process.env.SALT_ROUNDS || 10;
dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASS || 'bcqoz1!B', // Change this to your MySQL password
    database: process.env.DB_NAME || 'sanders_db', // Change this to your MySQL database name
}

export class DonationsModel {

    // Method to register a new donation in database
    static async registerNewDonation(amount, donor_id, type_id, comment, sector_id)
    {
        let connection = null;

        try
        {
            connection = await mysql.createConnection(config);

            await connection.query(
                'INSERT INTO donations (amount, donor_id, type_id, comment, sector_id) VALUES (?, ?, ?, ?, ?)',
                [amount, donor_id, type_id, comment, sector_id]);

            return true;

        }
        catch(error)
        {
            console.log('Error in register new donation: ', error);
            return false;
        }
        finally
        {
            if (connection)
            {
                connection.end();
                console.log('Conection closed');
            }
        }
    }

    // Method to get all donations from database
    static async getAll() {
        let connection = null;

        try 
        {
            connection = await mysql.createConnection(config);

            const [donations] = await connection.query(
                `SELECT 
                d.id,
                d.amount,
                u.name AS donor_name,   
                d.comment,
                s.description AS sector_name,   
                dt.description AS type_name,
                d.date
                FROM donations d
                JOIN users u ON d.donor_id = u.id  
                JOIN sectors s ON d.sector_id = s.id
                JOIN donation_types dt ON d.type_id = dt.id`
            );

            return donations;
        }
        catch (error)
        {
            console.log('Error to fetching donations: ', error);
            return [];
        }

        finally 
        {
            if (connection)
            {
                connection.end();
                console.log('Connection closed');
            }
        }
    }
}
