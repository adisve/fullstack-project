import { Request, Response, NextFunction } from 'express';
import { toSession } from './authenticated';

function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const session = toSession(req);
    if (!session || !session._id || session.role !== 'admin') {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    next();
}

export default authorizeAdmin;
