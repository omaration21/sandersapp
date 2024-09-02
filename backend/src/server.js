import express from 'express';
import connection_to_db from './config/db.js';
import userRoutes from './routes/userRoutes.js'; 


const app = express();


app.use(express.json());

// Probar la conexión a la base de datos al iniciar el servidor
async function startServer() {
    try {
        const dbConnection = await connection_to_db();
        console.log('Database connected successfully.');

        app.use((req, res, next) => {
            req.db = dbConnection;
            next();
        });

        // Definir las rutas
        app.use('/api/users', userRoutes); // Ejemplo de ruta

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

startServer();
