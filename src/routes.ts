/**
 *
 * @author Ivan Zanon
 *
 * @description Routes for api access
 *
 */

import express from 'express';
import AuthorizationManager from './jwt/AuthorizationManager';
import UserController from './controller/UserController';

const routes = express.Router();
const authorizationManager = new AuthorizationManager();
const userController = new UserController();

routes.get('/users', userController.index);
routes.get('/users/:id', authorizationManager.verifyJWT, userController.show);
routes.post('/users', userController.store);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);
routes.post('/login', userController.login);
routes.post('/userExists', userController.userExists);

export default routes;
