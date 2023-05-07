import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';

interface ISession extends Session {
    _id: string;
    Email: string;
    role: string;
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
    const session = req.session as ISession;

    if (!session || !session._id || session.role !== 'admin') {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    next();
}

export default isAdmin;
