import pm2, {ProcessDescription} from 'pm2';

interface Pm2Env {
    node_verion: String;
    versioning: String;
    version: String;
    node_version: String;
    unstable_restarts: String;
    restart_time: String;
    status: String;
}

const getProcess = () => {
    return new Promise((resolve, reject) => {
        pm2.list((err, processDescriptionList: Array<ProcessDescription>) => {
            if (err) {
                console.warn('PM2 list error', err);
                reject(err);
            };
            const listProcess = processDescriptionList.map(process => {
                const {pid, name} = process;
                
                if(process.pm2_env){
                    const {node_version, versioning, version, unstable_restarts, restart_time, status} = (process.pm2_env as unknown) as Pm2Env;
                    return {pid, name, node_version, versioning, version, unstable_restarts, restart_time, status};
                } else {
                    return {pid, name, status};
                }
            })

            resolve(listProcess);
        });
    })
};

export default getProcess;