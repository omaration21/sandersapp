import { Router } from 'express';
import { UserController } from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.get('/get', UserController.getAll);
usersRouter.post('/register', UserController.registerNewUser);
usersRouter.post('/login', UserController.getLogin);