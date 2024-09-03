import { UserModel } from '../models/mysql/users.js';
// import { validateUser, validatePartialUser } from '../schemas/user.js';

export class UserController {
    static async getAll(_req, res) {
        try {
            const users = await UserModel.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    }
}