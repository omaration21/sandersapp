import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export class MailModel {
    static async sendMail(email, subject, text) {
        try {
            const htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://sanders.com.mx/wp-content/uploads/2022/12/logo.png" alt="Company Logo" style="max-width: 150px;"/>
                    </div>
                    <h2 style="color: #333;">${subject}</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #555;">
                        ${text}
                    </p>
                    <p style="font-size: 14px; color: #888;">
                        Gracias por ser parte de nuestra comunidad.
                    </p>
                    <hr style="border: 0; height: 1px; background: #eaeaea; margin: 20px 0;" />
                    <div style="text-align: center; font-size: 12px; color: #999;">
                        <p>© 2024 Sanders Fundación. Todos los derechos reservados.</p>
                        <p><a href="https://sanders.com.mx" style="color: #1a73e8; text-decoration: none;">Visita nuestro sitio web</a></p>
                    </div>
                </div>
            `;

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                html: htmlContent,
            });

            return true;
        } catch (error) {
            console.error('Error: ', error);
            return false;
        }
    }
}