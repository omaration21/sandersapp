import { MailModel } from "../models/mail/mail.js";

export class MailController {
    static async sendMail(req, res) {
        const { email, subject, text } = req.body;
        
        const result = await MailModel.sendMail(email, subject, text);

        if (result) {
            return res.status(200).json({ message: 'Correo enviado correctamente' });
        } else {
            return res.status(500).json({ message: 'Error al enviar el correo' });
        }
    }
}