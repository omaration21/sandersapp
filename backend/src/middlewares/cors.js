import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://zumaya.dev'
]

export const corsMiddleware = cors({ acceptedOrigins: ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callback(null, true);
        } 
        if (!origin) {
            callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
});