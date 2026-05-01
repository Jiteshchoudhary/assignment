import { verify } from 'jsonwebtoken';

import { Response, NextFunction } from 'express';

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    try {
        const checkHeader = req.headers.authorization;
        if (!checkHeader) {
            return Promise.reject({
                status: 400,
                message: 'Authorization Header is missing'
            });

        }
        if (!checkHeader.startsWith('Bearer')) {
            return Promise.reject({
                status: 400,
                message: 'Authorization Header is invalid'
            })
        }
        const token = checkHeader.split('Bearer')[1].trim();
        const secret = process.env.JWT_sECRET || '';
        const verifyToken: any = verify(token, secret, { ignoreExpiration: false });
        if (!verifyToken) {
            return Promise.reject({
                status: 400,
                message: 'Token verification failed'
            })
        }
        req['userId'] = verifyToken['user_id'];
        req['tenantId'] = verifyToken['tenantId'];
        next();
    } catch (error) {
        next(error);
    }

}