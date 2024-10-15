import express from 'express';
import { getGoogleMapsApiKey } from '../controllers/google.js';

const router = express.Router();

router.get('/google-maps-key', getGoogleMapsApiKey);

export default router;