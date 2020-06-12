import pm2 from 'pm2';

const PullController = {
    index: (req, res) => {
        pm2.pullAndReload('server', function(err, meta) {
            if (meta) {
  
              console.log('>>>>>>>>>>>>> Successfully pulled Application! [App name: %s]', 'server')
              res.status(201).json();
            }
            if (err)
              console.log('App %s already at latest version', 'server');
              res.status(201).json();
          });
    }
}

export default PullController;

