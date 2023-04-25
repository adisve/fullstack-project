import { Request, Response } from 'express';
import { Router } from 'express';
import { createUser, getEmail } from '../db/model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config({ path: './config.env' });

import { Session } from 'express-session';

export interface ISession extends Session {
    _id?: any;
    Email?: string;
}

const router = Router();

router.post('/login', async function (req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await getEmail(email);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        } else {
            (req.session as ISession)._id = user._id;
            (req.session as ISession).Email = user.email;
        }

        res.status(200).json({
            user: user,
        });
    } catch (error) {
        console.error('Unable to log in', error);
        return res.status(500).json({
            message: 'Unable to log in',
        });
    }
});

router.post('/register', async function (req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        } else {
            const userExists = await getEmail(email);
            if (userExists) {
                console.error('User email already exists');
                return res
                    .status(400)
                    .json({ message: 'Email already exists' });
            } else {
                const user = await createUser({
                    email,
                    name,
                    password,
                });
                return res.status(200).json({
                    message: 'created account',
                });
            }
        }
    } catch (error) {
        console.error('Unable to register');
        return res.status(400).json({
            message: 'Could not create account',
        });
    }
});

router.get('/login', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        return res.render('/', { id: (req.session as ISession)._id });
    }
    res.end();
});

router.get('/logout', async function (req: Request, res: Response) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/auth/login');
        }
    });
});

export default router;
