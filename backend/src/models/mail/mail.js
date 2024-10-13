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
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                text,
            });
            return true;
        } catch (error) {
            console.log('Error: ', error);
            return false;
        }
    }
}