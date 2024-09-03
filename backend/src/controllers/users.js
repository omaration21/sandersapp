import { UserModel } from '../models/mysql/users.js';
//import { validateUser, validatePartialUser } from '../schemas/user.js';

export class UserController {
    static async getAll(_req, res) {
        const users = await UserModel.getAll();
        res.json(users);
    }
}
