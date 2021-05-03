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

// const convertDateFromStringToNumber = (date) => {
//   const year = date.slice(0, 4);
//   const month = date.slice(5,7);
//   const day = date.slice(8,10);

//   return year * 10000 + month * 100 + day * 1;
// }


// const convertDateFromNumberToString = (date) => {
//   const year = parseInt(date/10000, 10)
//   const month = parseInt(date%10000/100, 10)
//   const day = parseInt(date%100, 10)
//   return year + '-' + 
//     ((month<=9) ? 0 : '') + month + '-' +
//     ((day<=9) ? 0 : '') + day;
// }



