import {Request, Response} from 'express';
import {RequestAuth} from '../middlewares/auth';
import bcrypt from 'bcryptjs';
import connection from '../database/connection';

import generateToken from '../utils/generateToken';
import generateNumberCode from '../utils/generateNumberCode';
import SendEmail from '../utils/sendEmail';

import { authorizationUserIsAdmin } from '../utils/verifyUserAuthenticate'

const UserController = {
    index: async (req: RequestAuth, res: Response) => {
        try {
            authorizationUserIsAdmin(req, res);
    
            const users = await connection('users');
    
            return res.status(200).json(users)
        } catch (err) {
            return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message});
        }
    },
    register: async (req: Request, res: Response) => {
        const userContent = req.body,
            { user } = userContent;
            try {
                if((await connection('users').where({user})).length!==0)
                    return res.status(400).json({statusCode: 400, error: "Bad Request", message: "\"user\" already in use", validation: { source: "body", keys: [ "user"]}})

                    userContent.password = await bcrypt.hash(userContent.password, 10);

                let id: StringConstructor;
                [id] = await connection('users')
                    .insert({...userContent, type: '3'});

                delete userContent.password;
                res.status(200).json({user: {id, ...userContent, type: 2}, token: generateToken({id, user: userContent.user, type: userContent.type})});

            } catch (err) {
                return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
            }
    },
    auth: async (req: Request, res: Response) => {
        const {password, user} = req.body;
        try {
            const userContent = await connection('users')
                .where({user})
                .first();
                
            if(!userContent)
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: "user not found", validation: { source: "body", keys: [ "user"]}})
            
            if(userContent.type!=='3')
                return res.status(403).json({statusCode: 403, error: "Forbidden", message: "user don't validate for admin", validation: { keys: [ "type"]}})
            
            if(!await bcrypt.compare(password, userContent.password))
                return res.status(403).json({statusCode: 403, error: "Forbidden", message: "access denied", validation: { source: "body", keys: [ "password"]}})
            
            delete userContent.password;

            res.status(200).json({user: {...userContent}, token: generateToken({id: userContent.id, user: userContent.user, type: userContent.type})});
        } catch (err) {
            return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
        }
    },
    getNewPassword: async (req: Request, res: Response) => {
        const { email } = req.body;

        try {
            const userContent = await connection('users')
                .where({email})
                .first();

            if(!userContent)
                return res.status(400).json({statusCode: 400, error: "Bad Request", message: `user not found with this email`, validation: { source: "body", keys: ['email']}})

            let token = await bcrypt.genSalt(10);
            let code = generateNumberCode(6);

            await connection('resetPassword')
                .insert({
                    idUser: userContent.id,
                    token,
                    code: await bcrypt.hash(`${code}`, 10)
                });

            /**
             * @todo Remove Log of code on resetPassword
             * @body This log is for don't need send or verify email in dev time.
             */
            console.log('Email', code);

            await new SendEmail()
                .noReplay({
                    to: email,
                    subject: 'Recuperar Senha',
                    html: `<p>Use o código <strong>${code}</strong> para redefinir a sua senha.<br/><a href="https://pm2.projeto.mh4sh.dev/password#!${token}">https://pm2.projeto.mh4sh.dev/password#!${token}</a></p>`,
                    text: `Use o código ${code} para redefinir a sua senha. \n https://pm2.projeto.mh4sh.dev/password#!${token}`
                })

            /**
             * @todo Create Model of email
             */
            return res.status(200).json({statusCode: 200, token})
        } catch (err) {
			return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
        }
    },
    setNewPassword: async (req: Request, res: Response) => {
        const { token, code, password } = req.body;

        try {
            let resetPassword = await connection('resetPassword')
                .where({token})
                .first();

            if(!await bcrypt.compare(`${code}`, resetPassword.code))
                return res.status(403).json({statusCode: 403, error: "Forbidden", message: "Wrong code", validation: { source: "body", keys: [ "code"]}})
						
            let hash = await bcrypt.hash(password, 10);

            let trx = await connection.transaction();

            await trx('user')
            .where('id', resetPassword.idUser)
            .update({
                password: hash
            });

            const userContent = await trx('user')
                .where('id', resetPassword.idUser)
                .first();

            
            await trx('resetPassword')
                .where('idUser', resetPassword.idUser)
                .delete();
            
            await trx.commit();

            delete userContent.password;

            res.status(200).json({user: {...userContent}, token: generateToken({id: userContent.id, user: userContent.user, type: userContent.type})});
        } catch (err) {
			return res.status(400).json({statusCode: 400, error: 'Bad Request', message: err.message})
        }
    }
}

export default UserController;