/**
 *
 * @author Ivan Zanon
 *
 * @description Routes for api access
 *
 */

import express from 'express';

import CourseController from './controller/CourseController';
import TeacherController from './controller/TeacherController';
import UserController from './controller/UserController';
import AuthorizationManager from './jwt/AuthorizationManager';

const routes = express.Router();
const authorizationManager = new AuthorizationManager();
const userController = new UserController();
const teacherController = new TeacherController();
const courseController = new CourseController();

/**
 * @swagger
 *
 * /users:
 *  get:
 *      description: Use to get a list of all Users
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Success
 */
routes.get('/users', userController.index);

/**
 * @swagger
 *
 * /users/:id:
 *  get:
 *      description: Use to informations about one user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            description: ID of the user
 *            required: true
 *            in: path
 *      responses:
 *          200:
 *              description: Success
 */
routes.get('/users/:id', authorizationManager.verifyJWT, userController.show);
routes.post('/users', userController.store);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);
routes.post('/login', userController.login);
routes.post('/userExists', userController.userExists);

routes.get('/teachers', teacherController.index);
routes.post('/teachers', teacherController.store);

routes.get('/courses', courseController.index);
routes.post('/courses', courseController.store);
routes.delete('/courses/:id', courseController.delete);
routes.get('/coursesOfTeacher/:id', courseController.getClassesOfTeacher);

export default routes;
