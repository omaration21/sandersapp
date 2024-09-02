import express from 'express';
import connection_to_db from './config/db.js';

const app = express();

app.use(express.json());

// Probar la conexión a la base de datos al iniciar el servidor
async function startServer() {
    try {
        const dbConnection = await connection_to_db();
        console.log('Database connected successfully.');

        app.use((req, _res, next) => {
            req.db = dbConnection;
            next();
        });

        // Ruta para obtener todos los usuarios
        app.get('/api/users', async (req, res) => {
            try {
                const [rows] = await req.db.query('SELECT * FROM usuarios');
                res.json(rows);
            } catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ message: 'Error fetching users' });
            }
        });

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

startServer();