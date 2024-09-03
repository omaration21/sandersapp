import express, { json } from 'express';
import { usersRouter } from './routes/users.js';
//import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.use(json());
//app.use(corsMiddleware);

app.use('/users', usersRouter);

const PORT = process.env.PORT ?? 5001;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});