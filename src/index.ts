import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthenticationRoutes from './modules/authentication/routes/authentication.routes';
import VehicleRoutes from './modules/vehicle/routes/vehicle.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


dotenv.config();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./modules/vehicle/routes/vehicle.routes.ts', './modules/authentication/routes/authentication.routes.ts'],
};

app.use(cors());
app.use(express.json());
app.use('/api/authentication', AuthenticationRoutes);
app.use('/api/vehicles', VehicleRoutes);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(8080, () => {
  console.log('HTTP Server running!');
});

export default app;