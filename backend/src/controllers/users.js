import { UserModel } from '../models/mysql/users.js';

export class UserController {
    static async getAll(_req, res) {
        try {
            const users = await UserModel.getAll();
            
            const transformedUsers = users.map(user => ({
                id: user.id,
                name: user.name, 
                email: user.email,
                role_id: user.role_id,
                phone: user.phone,
                profile_image_url: user.profile_image_url
            }));
            
            
            res.status(200).json(transformedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    }

    static async registerNewUser(req, res) {
        const { name, email, password, role_id, phone } = req.body;
        
        try {
            const result = await UserModel.registerNewUser(name, email, password, role_id, phone);
    
            if (result.success) {
                res.status(201).json({ message: 'User registered successfully' });
            } else {
                res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user due to server error' });
        }
    }

    static async getLogin(req, res) {
        const {email, password} = req.body;
        try 
        {
            const result = await UserModel.getLogin(email, password);
            if (result) 
            {
                res.status(200).json({user: result.user, message: 'User logged in successfully', token: result.token, refreshToken: result.refreshToken});
            }
            else
            {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Failed to log in user' });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, role_id, phone } = req.body;
    
        try {
          const updatedUser = await UserModel.updateUser(id, name, email, role_id, phone);
          if (updatedUser) {
            res.status(200).json({ message: 'User updated successfully' });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ message: 'Failed to update user' });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const userDeleted = await UserModel.deleteUser(id); 
            if (userDeleted) {
                res.status(200).json({ message: 'User deleted successfully, donations updated' });
            } else {
                res.status(500).json({ message: 'Failed to delete user' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }

    static async refreshToken(req, res)
    {
        const { token } = req.body;
        try 
        {
            const newTokens = await UserModel.refreshToken(token);

            if (newTokens)
            {
                res.status(200).json(newTokens);
            }
        }
        catch(error)
        {
            console.log('Failed to refresh token: ', error);
            res.status(500).json({ message: 'Error to refresh token'});
        }
    }

    static async uploadProfileImage(req, res) {
        // Aquí, `multer` ya habrá manejado la subida del archivo y estará disponible en `req.file`
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
        }

        const imageUrl = `/uploads/${req.file.filename}`;  // Ruta donde la imagen fue guardada

        try {
            const userId = req.params.id;  // Asume que el ID del usuario se pasa en los parámetros de la ruta
            const updatedUser = await UserModel.updateProfileImage(userId, imageUrl);

            if (updatedUser) {
                res.status(200).json({ message: 'Imagen de perfil actualizada', profile_image_url: imageUrl });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar la imagen de perfil:', error);
            res.status(500).json({ message: 'Error al actualizar la imagen de perfil' });
        }
    }
}
