//https://github.com/vguillou/pm2-list-rest/blob/master/src/startHttpServer.js

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import routes from './routes';

app.use(routes);

export default (port) => {
    return app.listen(port, function listener(err) {
            if (err) return console.error('Could not start HTTP server:', err);
            console.log(`HTTP server is listening on ${port}`);
        });
};
