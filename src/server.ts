/**
 *
 * @author Ivan Zanon
 *
 * @description Main server class
 *
 */
import express from 'express';
import cors from 'cors';
import routes from './routes';

// Iniciando App
const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.listen(3002);
