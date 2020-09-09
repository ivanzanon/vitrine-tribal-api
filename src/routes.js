/**
 * 
 * @author Ivan Zanon
 * 
 * @description Routes for api access
 * 
 */

const express = require('express');
const authorizationManager = require('./jwt/authorizationManager');
const routes = express.Router();
const userController = require('./controller/UserController');

routes.get('/users', userController.index);
routes.get('/users/:id', authorizationManager.verifyJWT, userController.show);
routes.post('/users', userController.store);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);
routes.post('/login', userController.login);
routes.post('/userExists', userController.userExists);

module.exports = routes;