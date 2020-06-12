import express from 'express';
const routes = express.Router();

import UserController from '../constrollers/UserController';

routes.get('/', UserController.index);
routes.post('/authenticate', UserController.auth);
routes.post('/register', UserController.register);


export default routes;