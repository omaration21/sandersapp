import { Router } from 'express';
import { UserController } from '../controllers/users.js';

export const usersRouter = Router();

// Obtener todos los usuarios
usersRouter.get('/get', UserController.getAll);

// Registrar un nuevo usuario
usersRouter.post('/register', UserController.registerNewUser);

// Iniciar sesión de un usuario
usersRouter.post('/login', UserController.getLogin);

// Actualizar un usuario existente
usersRouter.put('/update/:id', UserController.updateUser);

// Eliminar un usuario
usersRouter.delete('/:id', UserController.deleteUser);
