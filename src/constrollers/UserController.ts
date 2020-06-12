import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';

const UserController = {
    index: (req: Request, res: Response) => {
        res.status(200).json({oi: 0})
    },
    register: async (req: Request, res: Response) => {
        const pass = '123';

        const mh4sh = await bcrypt.hash(pass, 10)

        res.status(200).json({oi: mh4sh})
    },
    auth: (req: Request, res: Response) => {
        res.status(200).json({oi: 0})
    }
}

export default UserController;