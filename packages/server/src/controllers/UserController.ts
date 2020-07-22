import {Request, Response} from 'express';
import {RequestAuth} from '../middlewares/auth';
import bcrypt from 'bcryptjs';
import connection from '../database/connection';
import generateToken from '../utils/generateToken';

const UserController = {
    index: async (req: RequestAuth, res: Response) => {
        try {
            if(req._userType!=='1')
                return res.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied"});
    
            const users = await connection('users');
    
            return res.status(200).json(users)
        } catch (err) {
            return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message});
        }
    },
    register: async (req: Request, res: Response) => {
        const body = req.body,
            user = body.user;
            try {
                if((await connection('users').where({user})).length!==0)
                    return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"user\" already in use", validation: { source: "body", keys: [ "user"]}})

                body.password = await bcrypt.hash(body.password, 10);
                let id: StringConstructor;
                [id] = await connection('users')
                .insert({...body, type: 2});

                body.password = undefined;
                res.status(200).json({user: {id, ...body, type: 2}, token: generateToken({id, user: body.user, type: body.type})});

            } catch (err) {
                return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
            }
    },
    auth: async (req: Request, res: Response) => {
        const {password, user} = req.body;
        try {
            const userData = await connection('users')
                .where({user})
                .first();
            
            if(!userData)
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: "user not found", validation: { source: "body", keys: [ "user"]}})
            
            if(!await bcrypt.compare(password, userData.password))
                return res.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied", validation: { source: "body", keys: [ "password"]}})
            
            userData.password = undefined;

            res.status(200).json({user: {...userData}, token: generateToken({id: userData.id, user: userData.user, type: userData.type})});
        } catch (err) {
            return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
        }
    }
}

export default UserController;