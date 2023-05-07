import { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'user route' });
});

export default router;
