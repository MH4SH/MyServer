import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import connection from '../database/connection';
import generateToken from '../utils/generateToken';

const UserController = {
    index: (req: Request, res: Response) => {
        res.status(200).json({oi: 0})
    },
    register: async (req: Request, res: Response) => {
        const body = req.body,
            user = body.user;
            try {
                if(await (await connection('users').where({user})).length!==0)
                    return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"user\" already in use", validation: { source: "body", keys: [ "user"]}})

                body.password = await bcrypt.hash(body.password, 10);

                const [id] = await connection('users')
                .insert(body);

                body.password = undefined;
                res.status(200).json({user: {id, ...body}, token: generateToken({id, user: body.user, type: body.type})});

            } catch (err) {
                return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
            }
    },
    auth: (req: Request, res: Response) => {
        res.status(200).json({oi: 0})
    }
}

export default UserController;