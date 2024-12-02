import { Router } from 'express';
import { AuthenticationMiddleware } from '../../../infrastructure/middlewares/authentication.middleware';
import { JwtService } from '../../../shared/jwt.service';
import { RouteController } from '../controllers/routes.controller';

const router = Router();
const routesController = new RouteController();
const jwtService = new JwtService();
const authenticationMiddleware = new AuthenticationMiddleware(jwtService);


router.post('/create', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), routesController.createRoute.bind(routesController));
router.get('/findAll', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), routesController.findAll.bind(routesController));
router.get('/findByUserId/:userId', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), routesController.findRouteByUserId.bind(routesController));
router.get('/findByManagerId/:managerId', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), routesController.findRouteByManagerId.bind(routesController));
router.delete('/:routeId', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), routesController.deleteRoute.bind(routesController));
router.patch('/:routeId', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), routesController.updateRoute.bind(routesController));


export default router;
