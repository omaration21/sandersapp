import { Router } from 'express';
import { UserController } from '../controllers/users.js';
import { verifyToken } from '../middlewares/token.js'

export const usersRouter = Router();

// Get all users
usersRouter.get('/get', verifyToken,  UserController.getAll);

// Register user
usersRouter.post('/register', verifyToken,  UserController.registerNewUser);

// Login user
usersRouter.post('/login', UserController.getLogin);

// Update existing user
usersRouter.put('/update/:id', verifyToken,  UserController.updateUser);

// Delete user
usersRouter.delete('/:id', verifyToken, UserController.deleteUser);

// Register donation
usersRouter.post('/registerDonation', verifyToken, UserController.registerNewDonation)