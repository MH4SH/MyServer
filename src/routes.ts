import express from 'express';
const routes = express.Router();


import ListController from './constrollers/ListController';
import PullController from './constrollers/PullController';


routes.use('/list', ListController.index);
routes.use('/pull', PullController.index);


export default routes;