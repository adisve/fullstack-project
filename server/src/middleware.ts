import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const secretKey: string = process.env.SECRET_KEY || '';

interface userPayload {
    name: String;
    password: String;
}

declare global {
    namespace Express {
        interface Request {
            user?: userPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token = req.session?.jwt;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (!token) {
        return res.status(401).json({
            message: 'Access token is required',
        });
    }
    try {
        const decodedToken = jwt.verify(token, secretKey) as userPayload;
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error('Unable to verify token', err);
        return res.status(401).json({
            message: 'Access token is invalid',
        });
    }
};
