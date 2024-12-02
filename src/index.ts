import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthenticationRoutes from './modules/authentication/routes/authentication.routes';
import VehicleRoutes from './modules/vehicle/routes/vehicle.routes';
import UsersRoutes from './modules/users/routes/users.routes';
import RouteRoutes from './modules/routes/routes/routes.route';

import { createServer } from 'http';
import { WebSocketService } from './modules/realtime-management/services/websocket.service';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/authentication', AuthenticationRoutes);
app.use('/api/vehicles', VehicleRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/routes', RouteRoutes)

const server = createServer(app);
const webSocketService = new WebSocketService(server);
webSocketService.initialize();

app.get("/", (req, res) => res.send("Express on Vercel"));

server.listen(8080, () => {
  console.log('HTTP Server running on port 8080!');
});

export default server;
