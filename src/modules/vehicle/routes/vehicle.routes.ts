import { Router } from 'express';
import { AuthenticationMiddleware } from '../../../infrastructure/middlewares/authentication.middleware';
import { VehicleController } from '../controllers/vehicle.controller';
import { JwtService } from '../../../shared/jwt.service';

const router = Router();
const vehicleController = new VehicleController();
const jwtService = new JwtService();
const authenticationMiddleware = new AuthenticationMiddleware(jwtService);

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Endpoints relacionados a veículos
 */

/**
 * @swagger
 * /api/vehicles/create:
 *   post:
 *     summary: Cria um novo veículo
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carro A"
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/create', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.createVehicle.bind(vehicleController));

/**
 * @swagger
 * /api/vehicles/getAll:
 *   get:
 *     summary: Obtém todos os veículos
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "Carro A"
 *                   userId:
 *                     type: string
 *                     example: "user123"
 */
router.get('/getAll', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.findAll.bind(vehicleController));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Obtém veículo por ID de usuário
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: Detalhes do veículo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 name:
 *                   type: string
 *                   example: "Carro A"
 *                 userId:
 *                   type: string
 *                   example: "user123"
 *       404:
 *         description: Veículo não encontrado
 */
router.get('/:id', authenticationMiddleware.authenticateToken.bind(authenticationMiddleware), vehicleController.findByUserId.bind(vehicleController));

export default router;
