import jwt from 'jsonwebtoken';
import { DonationsModel } from '../models/mysql/donations.js';

export class DonationsController {
    // Método para registrar una nueva donación (autenticada)
    static async registerNewDonation(req, res) {
        console.log('Solicitud recibida:', req.body);
        console.log('Headers:', req.headers);

        const token = req.headers.authorization?.split(' ')[1];
        let donorId = null;

        const jwtSecret = process.env.JWT_SECRET;

        if (token) {
            try {
                console.log('Verificando token:', token);
                const decoded = jwt.verify(token, jwtSecret); // Verifica el token con la clave secreta global
                console.log('Token decodificado:', decoded);

                if (!decoded || !decoded.id) {
                    console.log('Estructura de token inválida');
                    return res.status(401).json({ message: 'Invalid token structure' });
                }

                donorId = decoded.id;

            } catch (error) {
                console.error('Error al verificar el token:', error);
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
        } else {
            console.log('No se proporcionó un token');
            return res.status(401).json({ message: 'No token provided' });
        }

        // Datos de la donación
        const { amount, type_id, comment, sector_id } = req.body;
        console.log('Datos de la donación:', { amount, type_id, comment, sector_id });

        if (!amount || !type_id || !sector_id) {
            console.log('Faltan datos para registrar la donación');
            return res.status(400).json({ message: 'Missing data for donation registration' });
        }

        try {
            const donationRegister = await DonationsModel.registerNewDonationAuthenticated(amount, donorId, type_id, comment, sector_id);
            console.log('Resultado del registro:', donationRegister);

            if (donationRegister) {
                res.status(200).json({ message: 'Donation registered successfully' });
            } else {
                console.error('Error al registrar la donación');
                res.status(500).json({ message: 'Failed to register donation' });
            }
        } catch (error) {
            console.error('Error registrando la donación:', error);
            res.status(500).json({ message: 'Error registering donation' });
        }
    }

    // Método para registrar una donación anónima
    static async registerAnonymousDonation(req, res) {
        console.log('Solicitud recibida:', req.body);
        const { amount, donor_email, type_id, comment, sector_id } = req.body;

        if (!amount || !donor_email || !type_id || !sector_id) {
            return res.status(400).json({ message: 'Missing data for anonymous donation registration' });
        }

        try {
            const result = await DonationsModel.registerAnonymousDonation(amount, donor_email, type_id, comment, sector_id);
            console.log('Resultado del registro anónimo:', result);

            if (result) {
                res.status(200).json({ message: 'Anonymous donation registered successfully' });
            } else {
                console.error('Error al registrar la donación anónima');
                res.status(500).json({ message: 'Failed to register anonymous donation' });
            }
        } catch (error) {
            console.error('Error registrando la donación anónima:', error);
            res.status(500).json({ message: 'Error registering anonymous donation' });
        }
    }

    // Método para obtener todas las donaciones
    static async getAll(_req, res) {
        try {
            const donations = await DonationsModel.getAll();
            console.log('Donaciones obtenidas:', donations);
            res.status(200).json(donations);
        } catch (error) {
            console.error('Error al obtener las donaciones:', error);
            res.status(500).json({ message: 'Failed to fetch donations' });
        }
    }

    static async getDonationsBySector(req, res) {}

    // Método para obtener donaciones por usuario
    static async getByUser(req, res) { 
        const { id } = req.params;
        console.log('ID de usuario:', id);

        try {
            const donations = await DonationsModel.getDonationsByUser(id);
            console.log('Donaciones obtenidas:', donations);
            res.status(200).json(donations);
        } catch (error) {
            console.error('Error al obtener las donaciones:', error);
            res.status(500).json({ message: 'Failed to fetch donations' });
        }
    }
}