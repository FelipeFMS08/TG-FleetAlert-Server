import { Router } from 'express';
import { AuthenticationMiddleware } from '../../../infrastructure/middlewares/authentication.middleware';
import { JwtService } from '../../../shared/jwt.service';
import { UsersController } from '../controllers/users.controller';

const router = Router();
const usersController = new UsersController();
const jwtService = new JwtService();
const authenticationMiddleware = new AuthenticationMiddleware(jwtService);

router.get('/getAll', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), usersController.findAll.bind(usersController));
router.get('/getUserInfos/:id', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), usersController.findUserInfos.bind(usersController));
router.put('/updateUserInfos/:id', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), usersController.updateUserInfos.bind(usersController));

export default router;
