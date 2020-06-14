import {Request, Response, NextFunction} from 'express';
import jwt, {DecodeOptions} from'jsonwebtoken';

export interface RequestAuth extends Request{
    _user?: String,
    _userType?: String,
    _userId?: String
}

interface DecodeItens extends DecodeOptions{
    id: String;
    user: String;
    type: String;
}

export default (req: RequestAuth, res: Response, next: NextFunction) => {
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
        
        const decodeResponse = decoded as DecodeItens;

        req._user = decodeResponse.user;
        req._userId = decodeResponse.id;
        req._userType = decodeResponse.type;
        return next();
    })
}