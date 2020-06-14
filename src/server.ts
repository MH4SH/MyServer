//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js

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
        console.log(`HTTP server is listening on ${port}`);
    });
}