import {Request, Response} from 'express';
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

const ListController = {
    index: (req: Request, res: Response) => {
        pm2.list((err, processDescriptionList: Array<ProcessDescription>) => {
            if (err) {
                console.warn('PM2 list error', err);
                return res.status(400).json(err);
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

            return res.status(200).json(listProcess);
        });
    }
}

export default ListController;

