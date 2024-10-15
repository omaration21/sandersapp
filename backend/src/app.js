import express, { json } from 'express';
import https from 'https';
import fs from 'fs';
import { usersRouter } from './routes/users.js';
import cors from 'cors';
import { donationsRouter } from './routes/donations.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { GptAdminRouter } from './routes/gpt_admin.js';
import { mailRouter } from './routes/mail.js';
import googleDonorRoutes from './routes/google_donor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer los certificados
const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
const certificate = fs.readFileSync('./certs/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(cors({
    origin: 'https://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));



app.use(json());
app.use('/users', usersRouter);
app.use('/donations', donationsRouter);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use('/gpt_admin', GptAdminRouter);
app.use('/email', mailRouter);
app.use('/api', googleDonorRoutes);

const PORT = process.env.PORT ?? 5001;

// Iniciar el servidor HTTPS
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
