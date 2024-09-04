import express, { json } from 'express';
import { usersRouter } from './routes/users.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Permitir solicitudes desde este origen
    methods: 'GET,POST,PUT,DELETE',  // Permitir estos métodos HTTP
    credentials: true  // Permitir el envío de cookies o cabeceras de autorización
}));

app.use(json());
app.use('/users', usersRouter);

const PORT = process.env.PORT ?? 5001;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});