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

export class GptAdminModel {
    static processQuery = async (query) => {
        let connection = null;
        try {
            connection = await mysql.createConnection(config);
            const [result] = await connection.query(`CALL ${query}`);
            return result;
        } catch (error) {
            console.error('Error: ', error);
            return [];
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }
}