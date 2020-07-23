//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js
//https://github.com/rconjoe/pm2panel/blob/master/pm2panel.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import getProcessPM2 from './services/getProcess';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

import routes from './Routes';
routes(app)

const port = process.env.PORT || 4404;

export default async () => {
    await getProcessPM2();
    
    app.listen(port, () => {
        console.log(`HTTP server is listening on :${port}`);
    });
}