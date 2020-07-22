import express from 'express';
const routes = express.Router();

import UserController from '../controllers/UserController';
import UserValidator from '../validator/UserValidator';

import middlewares from '../middlewares/auth';

routes.get('/', middlewares, UserController.index);
routes.post('/authenticate', UserValidator.auth, UserController.auth);
routes.post('/register', UserValidator.register, UserController.register);

routes.post('/password', UserValidator.getNewPassword, UserController.getNewPassword);
routes.post('/password/confirm', UserValidator.setNewPassword, UserController.setNewPassword);

export default routes;