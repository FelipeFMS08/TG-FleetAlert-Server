import { Router } from 'express';
import { AuthenticationMiddleware } from '../../../infrastructure/middlewares/authentication.middleware';
import { JwtService } from '../../../shared/jwt.service';
import { AuthController } from '../controllers/authentication.controller';

const router = Router();
const authController = new AuthController();
const jwtService = new JwtService();
const authenticationMiddleware = new AuthenticationMiddleware(jwtService);

router.post('/register', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/change-password', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), authController.changePassword.bind(authController));
router.post('/change-email', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), authController.changeEmail.bind(authController));
router.post('/forgot-password', authController.forgotPassword.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));
router.get('/verify-email', authController.verifyEmail.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));

export default router;
