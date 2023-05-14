import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

interface ISession extends Session {
    _id: string;
    email: string;
    role: string;
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const session = toSession(req);
    if (!session || !session._id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    next();
}

export function toSession(req: Request): ISession {
    return JSON.parse(
        Object.values(req.sessionStore['sessions']).pop() as string
    ) as ISession;
}

export default isLoggedIn;
