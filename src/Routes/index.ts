import {Express} from 'express';
import ListController from '../controllers/ListController';
import PullController from '../controllers/PullController';
import UserRoute from './UserRoute';


export default (app: Express) => {
    app.use('/user', UserRoute);
    app.use('/list', ListController.index);
    app.use('/pull', PullController.index);

};