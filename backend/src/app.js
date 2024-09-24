import express, { json } from 'express';
import https from 'https';
import fs from 'fs';
import { usersRouter } from './routes/users.js';
import cors from 'cors';
import { donationsRouter } from './routes/donations.js';

// Leer los certificados
const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
const certificate = fs.readFileSync('./certs/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(cors({
    origin: 'https://localhost:3000',  // Cambiar a HTTPS
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use(json());
app.use('/users', usersRouter);
app.use('/donations', donationsRouter);

const PORT = process.env.PORT ?? 5001;

// Iniciar el servidor HTTPS
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
