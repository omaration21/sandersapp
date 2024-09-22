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
                phone: user.phone
            }));
            
            
            res.status(200).json(transformedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    }

    static async registerNewUser(req, res) {
        const {name, email, password, role_id, phone} = req.body;
        try {
            const newUser = await UserModel.registerNewUser(name, email, password, role_id, phone);
            if (newUser) {
                res.status(201).json({ message: 'User registered successfully' });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    }

    static async getLogin(req, res) {
        const {email, password} = req.body;
        try 
        {
            const result = await UserModel.getLogin(email, password);
            if (result) 
            {
                res.status(200).json({user: result.user, message: 'User logged in successfully', token: result.token});
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

    // Method to register a new donation
    static async registerNewDonation(req, res)
    {
        const { amount, donor_id, type_id, comment, sector_id } = req.body;

        try
        {
            const donationRegister = await UserModel.registerNewDonation(amount, donor_id, type_id, comment, sector_id);

            if (donationRegister)
            {
                res.status(200).json({ message: 'Donation register succesfully' });
            }
            else
            {
                res.status(500).json({ message: 'Failed to register donation'});
            }
        }
        catch(error)
        {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
}
