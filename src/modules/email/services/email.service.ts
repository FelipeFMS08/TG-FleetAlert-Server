import { EmailProvider } from "../interfaces/email-provider.interface";

export class EmailService {
    constructor(private emailProvider: EmailProvider) {}

    async sendEmail(to:string, subject: string, body:string): Promise<void> {
        this.emailProvider.sendEmail(to, subject, body);
    }
}