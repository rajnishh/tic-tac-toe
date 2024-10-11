import express, { json } from 'express';
import { serve, setup } from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Database Connection
connectDB();

// Body Parser
app.use(json());

// Swagger Setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Tic-Tac-Toe API',
            version: '1.0.0',
            description: 'Tic-Tac-Toe Game Backend API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

//const swaggerDocs = swaggerJsdoc(swaggerOptions);
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use('/api-docs', serve, setup(swaggerDocument));

// Routes
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);

// Error Handling
app.use(errorMiddleware);

export default app; // Exporting the app instance
