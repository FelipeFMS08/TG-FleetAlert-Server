import { Request, Response } from 'express';
import { AuthenticationService } from '../services/authentication.service';
import { PrismaClient } from "../../../../prisma/generated/client";
import { JwtService } from '../../../shared/jwt.service';
import { EmailModule } from '../../email/email.module';
import { EmailService } from '../../email/services/email.service';
import { UserRepository } from '../repositories/user.repository';
import { CryptoService } from '../services/crypto.service';
import { TemporaryPasswordGeneratorService } from '../services/temporary-password-generator.service';

export class AuthController {
    private authenticationService: AuthenticationService;

    constructor() {
        const prisma = new PrismaClient();
        const userRepository = new UserRepository(prisma);
        const jwtService = new JwtService();
        const cryptoService = new CryptoService();
        const passwordGenerator = new TemporaryPasswordGeneratorService();
        const emailService = new EmailService(new EmailModule().emailService);

        this.authenticationService = new AuthenticationService(
            userRepository,
            jwtService,
            cryptoService,
            passwordGenerator,
            emailService
        );

    }

    async register(req: Request, res: Response) {
        const { email, name } = req.body;
        try {
            await this.authenticationService.register(email, name);
            res.status(201).send('Usuário registrado com sucesso.');
        } catch (error) {
            if (error instanceof UserAlreadExistsException) {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).send(error);
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            if (password) {
                const token = await this.authenticationService.login(email, password);
                return res.status(200).json({ token });
            }

            await this.authenticationService.login(email);
            return res.status(201).send('Senha temporária enviada com sucesso');
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                return res.status(404).json({ message: error.message });
            }
            if (error instanceof InvalidPasswordException) {
                return res.status(401).json({ message: error.message });
            }
            if (error instanceof FirstLoginAlreadyDoneException) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async changePassword(req: Request, res: Response) {
        const { userId, newPassword } = req.body;
        try {
            await this.authenticationService.changePassword(userId, newPassword);
            res.status(200).send("Senha alterada com sucesso.");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async changeEmail(req: Request, res: Response) {
        const { userId, newEmail } = req.body;
        try {
            await this.authenticationService.changeEmail(userId, newEmail);
            res.status(200).send("Email alterado com sucesso.");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;
        try {
            await this.authenticationService.forgotPassword(email);
            res.status(200).send("Email de redefinição de senha enviado.");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async resetPassword(req: Request, res: Response) {
        const { token, newPassword } = req.body;
        try {
            await this.authenticationService.resetPassword(token, newPassword);
            res.status(200).send("Senha redefinida com sucesso.");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async verifyEmail(req: Request, res: Response) {
        const { token } = req.query;
        try {
            await this.authenticationService.verifyEmail(token as string);
            res.status(200).send("Email verificado com sucesso.");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async refreshToken(req: Request, res: Response) {
        const { token } = req.body;
        try {
            const newToken = await this.authenticationService.refreshToken(token);
            res.status(200).json({ token: newToken });
        } catch (error) {
            res.status(401).send(error);
        }
    }
}
