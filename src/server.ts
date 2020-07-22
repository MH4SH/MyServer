//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js

/**
 * @todo List thinks that need finish
 * @body  - [ ]  User \n - [ ]  Create User \n - [ ]  List Users \n - [ ]  Auth Users \n - [ ]  Get Data User \n - [ ]  List Services and Save id for name \n - [ ]  Stop Service \n - [ ]  Start Service \n - [ ]  Restart Service \n - [ ]  Update Deploy \n - [ ]  Button \n - [ ]  Generate Link webhook deploy \n - [ ]  Config \n - Use tsc? \n - Execute pre code? \n - Execute migrates? \n - Execute yarn install 
 *  
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

import routes from './Routes';
routes(app)

const port = process.env.PORT || 4404;

export default () => { 
    app.listen(port, () => {
        console.log(`HTTP server is listening on :${port}`);
    });
}