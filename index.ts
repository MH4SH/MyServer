import pm2 from 'pm2';
import config from './src/config';
import server from './src/server';
config.initConfig({port: 3343});

pm2.connect(function(e) {
    if (e) return console.error('PM2 connection error', e);
    server(config.serverPort);
});