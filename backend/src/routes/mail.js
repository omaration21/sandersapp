import { Router } from 'express';
import { MailController } from '../controllers/mail.js';

export const mailRouter = Router();

mailRouter.post('/send', MailController.sendMail);
