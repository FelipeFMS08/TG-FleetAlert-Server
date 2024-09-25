import { Router } from 'express';
import { AuthenticationMiddleware } from '../../../infrastructure/middlewares/authentication.middleware';
import { VehicleController } from '../controllers/vehicle.controller';
import { JwtService } from '../../../shared/jwt.service';

const router = Router();
const vehicleController = new VehicleController();
const jwtService = new JwtService();
const authenticationMiddleware = new AuthenticationMiddleware(jwtService);

router.post('/create', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.createVehicle.bind(vehicleController));
router.get('/getAll', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.findAll.bind(vehicleController));
router.get('/:id', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.findByResponsibleId.bind(vehicleController));
router.post('/:id', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.deleteVehicle.bind(vehicleController))

export default router;
