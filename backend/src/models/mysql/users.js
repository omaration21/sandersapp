import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = process.env.SALT_ROUNDS || 10;
dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASS || 'bcqoz1!B', 
    database: process.env.DB_NAME || 'sanders_db',
}

export class UserModel {
    static async getAll() {
        let connection = null;
        try {
            connection = await mysql.createConnection(config);
            const [users] = await connection.query('SELECT id, name, email, role_id, phone FROM users');
            return users;
        } catch (error) {
            console.error('Error fetching users: ', error);
            return [];
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    static async registerNewUser(name, email, password, role_id, phone) {
        let connection = null;
        try {
            connection = await mysql.createConnection(config);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            await connection.query(
                'INSERT INTO users (name, email, password, role_id, phone) VALUES (?, ?, ?, ?, ?)',
                [name, email, hashedPassword, role_id, phone]
            );
    
            return { success: true, message: 'Usuario registrado correctamente' };
    
        } catch (error) {
            console.error('Error: ', error);
    
            if (error.code === 'ER_DUP_ENTRY') {
                return { success: false, message: 'El correo electrónico o teléfono ya está registrado.' };
            }
            
            return { success: false, message: 'Ocurrió un error al registrar el usuario.' };
    
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }

    static async getLogin(email, password) {
        let connection = null;
        try {
            connection = await mysql.createConnection(config);
            const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    
            if (users.length === 0) {
                return null;
            }
    
            const user = users[0];
            const match = await bcrypt.compare(password, user.password);
    
            if (!match) {
                return null;
            }
    
            const token = jwt.sign({ id: user.id, email: user.email, role_id: user.role_id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
    
            return { user, token };
        } catch (error) {
            console.error('Error: ', error);
            return null;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
    

    static async updateUser(id, name, email, role_id, phone) {
        let connection = null;
        try {
            connection = await mysql.createConnection(config);
            await connection.query(
                'UPDATE users SET name = ?, email = ?, role_id = ?, phone = ? WHERE id = ?',
                [name, email, role_id, phone, id]
            );
            return true;
        } catch (error) {
            console.error('Error: ', error);
            return false;
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }


    static async deleteUser(id) {
        let connection = null;
        try {
            connection = await mysql.createConnection(config);

            await connection.query('UPDATE donations SET donor_id = NULL WHERE donor_id = ?', [id]);

            await connection.query('DELETE FROM users WHERE id = ?', [id]);

            return true;
        } catch (error) {
            console.error('Error eliminando usuario:', error);
            return false;
        } finally {
            if (connection) {
                connection.end();
                console.log('Connection closed');
            }
        }
    }

    static async registerNewDonation(amount, donor_id, type_id, comment, sector_id)
    {
        let connection = null;

        try
        {
            connection = await mysql.createConnection(config);

            await connection.query(
                'INSERT INTO donations (amount, donor_id, type_id, comment, sector_id) VALUES (?, ?, ?, ?, ?)',
                [amount, donor_id, type_id, comment, sector_id]);

            return true;

        }
        catch(error)
        {
            console.log('Error registrando nueva donación: ', error);
            return false;
        }
        finally
        {
            if (connection)
            {
                connection.end();
                console.log('Conection closed');
            }
        }
    }
}
