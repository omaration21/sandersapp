import { Router } from 'express';
import { UserController } from '../controllers/users.js';
import { verifyToken } from '../middlewares/token.js'

export const usersRouter = Router();

usersRouter.get('/get', verifyToken,  UserController.getAll);
usersRouter.post('/register', verifyToken,  UserController.registerNewUser);

// Iniciar sesión de un usuario
usersRouter.post('/login', UserController.getLogin);

// Actualizar un usuario existente
usersRouter.put('/update/:id', verifyToken,  UserController.updateUser);

// Eliminar un usuario
usersRouter.delete('/:id', verifyToken, UserController.deleteUser);
