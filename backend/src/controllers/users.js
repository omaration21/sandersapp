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

    static async registerNewUser(req, res) 
    {
        const {name, email, password, role_id, phone} = req.body;
        try 
        {
            const newUser = await UserModel.registerNewUser(name, email, password, role_id, phone);
            if (newUser) 
            {
                res.status(201).json({ message: 'User registered successfully' });
            }
        }
        catch (error) 
        {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    }

    static async getLogin(req, res)
    {
        const {email, password} = req.body;
        try 
        {
            const user = await UserModel.getLogin(email, password);
            if (user) 
            {
                res.status(200).json({user, message: 'User logged in successfully'});
            }
            else
            {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }
        catch (error) 
        {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Failed to log in user' });
        }
    }
}