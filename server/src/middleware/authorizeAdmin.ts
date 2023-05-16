import { Request, Response, NextFunction } from 'express';

function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const { sessionUserId, role } = req.session;
    if (!sessionUserId || role !== 'admin') {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    console.log('User is admin');
    next();
}

export default authorizeAdmin;
