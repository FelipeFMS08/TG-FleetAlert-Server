import { NodeMailerProvider } from "./providers/nodemailer.provider";
import { EmailService } from "./services/email.service";

export class EmailModule {
    private emailProvider = new NodeMailerProvider();

    public emailService = new EmailService(this.emailProvider);
}