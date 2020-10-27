import cors from 'cors';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vitrine Tribal Api',
      description: 'Data Api for Vitrine Tribal',
      version: '1.0.0',
      contact: {
        name: 'Ivan B. Zanon',
      },
      servers: ['http://localhost:3002'],
    },
  },
  apis: ['./src/routes.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Iniciando App
const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.listen(3002);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
