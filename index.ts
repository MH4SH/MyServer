import pm2 from 'pm2';
import server from './src/server';

pm2.connect(function(e) {
    if (e) return console.error('PM2 connection error', e);
    server();
});
