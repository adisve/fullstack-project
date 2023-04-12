import { Request, Response } from 'express';
import { Router } from 'express';
import { currentUser } from '../middleware';
import { createUser, getEmail } from '../db/model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config({ path: './config.env' });
const secretKey: string = process.env.SECRET_KEY || '';

const router = Router();

router.get('/user', currentUser, async (req: Request, res: Response) => {
    res.send({ currentUser: req.user || null });
});

router.post('/login', async (req: Request, res: Response) => {
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
        }
        const userJwt = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            secretKey
        );
        req.session = {
            jwt: userJwt,
        };
        await user.save();
        res.cookie('Cookie', req.session);
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

router.post('/register', async (req, res) => {
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
                const userJwt = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                    },
                    secretKey
                );

                req.session = {
                    jwt: userJwt,
                };
                req.session.save();
                res.cookie('Cookie', req.session);
                return res.status(200).json({
                    jwt: userJwt,
                    user: user,
                    message: 'Account created successfully',
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

export default router;
