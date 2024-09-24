import { Router } from 'express';
import { DonationsController } from '../controllers/donations.js';
import { verifyToken } from '../middlewares/token.js'

export const donationsRouter = Router();

// Register new donation
donationsRouter.post('/registerDonation', verifyToken, DonationsController.registerNewDonation);

// Get all doantions
donationsRouter.get('/get', verifyToken, DonationsController.getAll);