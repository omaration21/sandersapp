import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';

const saltRounds = process.env.SALT_ROUNDS || 10;

dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASS || 'password', // Change this to your MySQL password
    database: process.env.DB_NAME || 'sanders_db', // Change this to your MySQL database name
}

export class UserModel {
    static async getAll() {
        let connection = null;

        try {
            connection = await mysql.createConnection(config);

            const [users] = await connection.query('SELECT * FROM users');
            return users;
        }
        catch (error) {
            console.error('Error: ', error);
            return [];
        }
        finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }

    static async registerNewUser(name, email, password, role_id, phone) 
    {
        let connection = null;

        try 
        {
            connection = await mysql.createConnection(config);

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await connection.query('INSERT INTO users (name, email, password, role_id, phone) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, role_id, phone]);

            return true;
        }
        catch (error) 
        {
            console.error('Error: ', error);
            return false;
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

    static async getLogin(email, pass) 
    {
        let connection = null;

        try {
            connection = await mysql.createConnection(config);

            const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

            const hashedPassword = user[0].password;

            const match = await bcrypt.compare(pass, hashedPassword);

            if (match) 
            {
                // const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // check if this is correct
                // return token;
                return user;
            }
        }
        catch (error) {
            console.error('Error: ', error);
            return [];
        }
        finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }
}