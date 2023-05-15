import { Request, Response, NextFunction } from 'express';
import { getSessionData } from '../session/session';

function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const session = getSessionData();
    if (!session || !session._id || session.role !== 'admin') {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    next();
}

export default authorizeAdmin;
