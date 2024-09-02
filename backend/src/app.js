import express from 'express';
const app = express();

// Import the connect function
const connect = require('./config/db');

// Create a route to get all users
app.get('/users', async (_req, res) => {
    
        let connection = null;

        try {
            connection = await connect();
            connection.query('SELECT * FROM usuarios WHERE cargo = 1', (error, results) => {
                if (error) {
                    throw error;
                }
                res.json(results);
            })
        }

        catch (error) {
            res.status(500).json({ error: error.message });
        }

        finally {
            if (connection) {
                connection.end();
            }
        }
})