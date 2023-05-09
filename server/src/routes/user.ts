import { Request, Response } from 'express';
import express from 'express';
const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'user route' });
});

export default route;
