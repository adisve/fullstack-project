import { Request, Response } from 'express';
import express from 'express';
import { User } from '../db/model';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'admin route' });
});

router.get('/users', async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});

router.delete('/user/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

export default router;
