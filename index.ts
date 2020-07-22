import pm2 from 'pm2';
import server from './src/server';

/**
 * @todo List thinks that need finish
 * @body 
- [ ]  User
    - [ ]  Create User
    - [ ]  List Users
    - [ ]  Auth Users
        - [ ]  Get Data User
- [ ]  List Services and Save id for name
    - [ ]  Stop Service
    - [ ]  Start Service
    - [ ]  Restart Service
    - [ ]  Update Deploy
        - [ ]  Button
        - [ ]  Generate Link webhook deploy
            - [ ]  Config
                - Use tsc?
                - Execute pre code?
                - Execute migrates?
                - Execute yarn install
 *  
 */

pm2.connect(function(e) {
    if (e) return console.error('PM2 connection error', e);
    server();
});
