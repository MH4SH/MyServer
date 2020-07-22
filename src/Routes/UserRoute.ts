import express from 'express';
const routes = express.Router();

import UserController from '../controllers/UserController';
import middlewares from '../middlewares/auth';

routes.get('/', middlewares, UserController.index);
routes.post('/authenticate', UserController.auth);
routes.post('/register', UserController.register);

routes.post('/password', UserController.getNewPassword);
routes.post('/password/confirm', UserController.setNewPassword);

export default routes;