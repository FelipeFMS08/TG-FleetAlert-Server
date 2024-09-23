import { generateEmailBody } from "../../../shared/generateEmail.template";
import { JwtService } from "../../../shared/jwt.service";
import { EmailModule } from "../../email/email.module";
import { EmailService } from "../../email/services/email.service";
import { AuthenticationDTO } from "../dto/AuthenticationDTO";
import { AuthenticationServiceInterface } from "../interfaces/authentication-service";
import { ICryptoService } from "../interfaces/crypto-service.interface";
import { IPasswordGenerator } from "../interfaces/password-generator.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";


export class AuthenticationService implements AuthenticationServiceInterface {
    constructor(
        private userRepository: IUserRepository,
        private jwtService: JwtService,
        private cryptoService: ICryptoService,
        private passwordGenerator: IPasswordGenerator,
        private emailService: EmailService
    ) {
        const emailModule = new EmailModule();
        this.emailService = emailModule.emailService;
    }

   async register(email: string): Promise<void> {
        const temporaryPassword = this.passwordGenerator.generateTemporaryPassword();
        const hashedtemporaryPassword = await this.cryptoService.hash(temporaryPassword);

        await this.userRepository.createUserWithoutPassword(email, hashedtemporaryPassword);
    }

    async login(email: string, password?: string): Promise<string> {
        const token = await this.validateUser(email, password);
        if (password) {
            if (!token) {
                throw new Error("Autenticação falhou. Token não gerado.");
            }
            return token;
        }
        return "First Acces";
    }

    async validateUser(email: string, password?: string): Promise<string | null> {
        const user = await this.userRepository.findUserByEmail(email);

        if (user && password) {
            const isPasswordValid = await this.cryptoService.compare(password, user.password);
            if (isPasswordValid) {
                return this.jwtService.generateToken({ id: user.id, email: user.email, firstAccess: user.isFirstLogin });
            }
            return null;
        }

        if (!password) {
            const temporaryPassword = this.passwordGenerator.generateTemporaryPassword();
            const hashedTemporaryPassword = await this.cryptoService.hash(temporaryPassword);

            if (user) {
                await this.userRepository.updatePassword(user.id, hashedTemporaryPassword);
            } else {
                await this.userRepository.createUserWithoutPassword(email, hashedTemporaryPassword);
            }

            const emailBody = generateEmailBody("senha", temporaryPassword);

            await this.emailService.sendEmail(
                email,
                'Sua senha Temporária',
                emailBody
            );
        }
        return null;
    }


    async changePassword(userId: string, newPassword: string): Promise<void> {
        const hashedPassword = await this.cryptoService.hash(newPassword);
        await this.userRepository.updatePassword(userId, hashedPassword);
    }

    async changeEmail(userId: string, newEmail: string): Promise<void> {
        await this.userRepository.updateEmail(userId, newEmail);
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.userRepository.findUserByEmail(email);

        if (user) {
            const resetToken = this.jwtService.generateToken({ id: user.id, email: user.email, firstAccess: user.isFirstLogin });
            const emailBody = generateEmailBody("recuperacao", `${process.env.RESET_PASSWORD_URL}?token=${resetToken}`);
            await this.emailService.sendEmail(
                email,
                'Redefinir Senha',
                emailBody
            );
        }
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const decodedToken = this.jwtService.verifyToken(token);

        if (!decodedToken) {
            throw new Error("Token inválidado ou expirado");
        }

        const hashedPassword = await this.cryptoService.hash(newPassword);
        await this.userRepository.updatePassword(decodedToken.id, hashedPassword);
    }

    async verifyEmail(token: string): Promise<void> {
        const decodedToken = this.jwtService.verifyToken(token);

        if (!decodedToken) {
            throw new Error("Token inválidado ou expirado");
        }

        await this.userRepository.verifyEmail(decodedToken.id);
    }
    async refreshToken(token: string): Promise<string> {
        const decodedToken = this.jwtService.verifyToken(token);
        if (!decodedToken) {
            throw new Error("Token inválido ou expirado.");
        }

        return this.jwtService.generateToken({ id: decodedToken.id, email: decodedToken.email, firstAccess: decodedToken.firstAccess });
     }

}