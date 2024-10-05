import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token)
    {
        return res.status(403).json({message: 'Token not provided' });
    }

    try
    {
        const bearerToken = token.split(' ')[1];

        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch(error)
    {
        console.error('Invalid token:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
