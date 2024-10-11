import { Router } from 'express';
import { DonationsController } from '../controllers/donations.js';
import { verifyToken } from '../middlewares/token.js';

export const donationsRouter = Router();

// Register new donation (authenticated)
donationsRouter.post('/registerDonation', verifyToken, DonationsController.registerNewDonation);

// Register anonymous donation (no authentication required)
donationsRouter.post('/anonymous-donation', DonationsController.registerAnonymousDonation);

// Get all donations (authenticated)
donationsRouter.get('/get', verifyToken, DonationsController.getAll);

// Get donations by donor (authenticated)
donationsRouter.get('/getByUser/:id', verifyToken, DonationsController.getByUser);
