/**
 *
 * @author Ivan Zanon
 *
 * @description Main server class
 *
 */
import cors from 'cors';
import express from 'express';

import routes from './routes';

// Iniciando App
const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.listen(3002);
