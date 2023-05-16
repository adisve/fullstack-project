import { Request, Response, NextFunction } from 'express';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const session = req.session.sessionUserId;
    if (!session) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    console.log('User authenticated');
    next();
}

export default isLoggedIn;
