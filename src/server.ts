//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js

import express from 'express';
import cors from 'cors';
require('custom-env').env('dev');
const app = express();

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