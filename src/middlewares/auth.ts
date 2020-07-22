import {Request, Response, NextFunction} from 'express';
import jwt, {DecodeOptions} from 'jsonwebtoken';

export interface RequestAuth extends Request {
    _userAuthenticate?: UserAuthenticateB;
}

interface UserAuthenticateB {
    id: String;
    user: String;
    type: String;
}

interface UserAuthenticate extends DecodeOptions {
    id: String;
    user: String;
    type: String;
}

const authMiddlewares = (req: RequestAuth, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    

    if(!authHeader)
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "No token provided"})

    const parts = authHeader.split(' ');

    if(parts.length !== 2)
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token error"})

    const [scheme, token] = parts;

    if(!/Bearer$/i.test(scheme))
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token malformatted"})

    jwt.verify(token, process.env.HASH_1_SECRET as string, (err, decoded) => {
        if(err)
            return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token invalid"})
        
        req._userAuthenticate = decoded as UserAuthenticate;
        return next();
    })
};

export default authMiddlewares;