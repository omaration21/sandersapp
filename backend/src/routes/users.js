import { Router } from 'express';
import { UserController } from '../controllers/users.js';
import { verifyToken } from '../middlewares/token.js'

export const usersRouter = Router();

usersRouter.get('/get', verifyToken,  UserController.getAll);
usersRouter.post('/register', UserController.registerNewUser);

// Iniciar sesión de un usuario
usersRouter.post('/login', UserController.getLogin);

// Actualizar un usuario existente
usersRouter.put('/update/:id', UserController.updateUser);

// Eliminar un usuario
usersRouter.delete('/:id', UserController.deleteUser);
