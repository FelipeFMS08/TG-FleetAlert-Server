import { EmailProvider } from "../interfaces/email-provider.interface";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER_NODEMAILER?.toString(),
        pass: process.env.EMAIL_PASSWORD_NODEMAILER?.toString(),
    }
});


export class NodeMailerProvider implements EmailProvider {
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        await transport.sendMail({
            from: `Equipe FleetAlert <${process.env.EMAIL_USER_NODEMAILER}>`,
            to: to,
            subject: subject,
            html: body,
        });
    }
}