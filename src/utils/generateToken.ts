import jwt from 'jsonwebtoken';

export default (params = {id: String, user: String, type: Number}, expiresIn = 86400) => {
    return jwt.sign(params, process.env.HASH_1_SECRET as string, {
        expiresIn
    })

}