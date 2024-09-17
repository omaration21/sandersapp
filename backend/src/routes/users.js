import { Router } from 'express';
import { UserController } from '../controllers/users.js';
import { verifyToken } from '../middlewares/token.js'

export const usersRouter = Router();

usersRouter.get('/get', verifyToken,  UserController.getAll);
usersRouter.post('/register', UserController.registerNewUser);
usersRouter.post('/login', UserController.getLogin);