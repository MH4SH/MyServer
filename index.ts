import pm2 from 'pm2';
import server from './src/server';

/**
 * @todo List thinks that need finish
 * @body  - [ ]  User
 * @body    - [ ]  Create User
 * @body    - [ ]  List Users
 * @body    - [ ]  Auth Users
 * @body    - [ ]  Get Data User
 * @body - [ ]  List Services and Save id for name
 * @body     - [ ]  Stop Service
 * @body     - [ ]  Start Service
 * @body     - [ ]  Restart Service
 * @body     - [ ]  Update Deploy
 * @body         - [ ]  Button
 * @body         - [ ]  Generate Link webhook deploy
 * @body             - [ ]  Config
 * @body                 - Use tsc?
 * @body                 - Execute pre code?
 * @body                 - Execute migrates?
 * @body                 - Execute yarn install
 *  
 */

pm2.connect(function(e) {
    if (e) return console.error('PM2 connection error', e);
    server();
});
