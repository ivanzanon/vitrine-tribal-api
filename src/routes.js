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

 //routes.get('/users', userController.index);

 module.exports = routes;