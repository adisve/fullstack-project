import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { getSessionData } from '../session/session';

interface ISession extends Session {
    _id: string;
    email: string;
    role: string;
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const session = getSessionData();
    if (!session || !session._id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    next();
}

export default isLoggedIn;
