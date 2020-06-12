import pm2 from 'pm2';

const ListController = {
    index: (req, res) => {
        pm2.list((err, processDescriptionList) => {
            if (err) {
                console.warn('PM2 list error', err);
                return res.status(400).json(err);
            };
            const listProcess = processDescriptionList.map(process => {
                const {pid, name} = process;
                const {node_version, versioning, version, unstable_restarts, restart_time, status} = process.pm2_env;
                return {pid, name, node_version, versioning, version, unstable_restarts, restart_time, status};
            })

            return res.status(200).json(listProcess);
        });
    }
}

export default ListController;

