import { Request, Response } from 'express';
import express from 'express';
import { User } from '../db/model';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'admin route' });
});

router.get('/allUsers', async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});

export default router;
