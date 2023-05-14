import { Request, Response } from 'express';
import express from 'express';
import { User } from '../db/model';
const route = express.Router();

route.get('/allUsers', async (req: Request, res: Response) => {
    console.log(req.session);
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

route.put('/userData/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

route.put('/userRole/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const { role } = req.body;
    try {
        if (role !== 'admin' && role !== 'user') {
            return res.status(404).json({ message: 'Role not found' });
        }
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { role: role },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

route.delete('/deleteUser/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: 'Successfully deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

export default route;
