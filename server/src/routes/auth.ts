import { Request, Response } from 'express';
import { Router } from 'express';
import {
    User,
    createUser,
    updateOnBoarded,
    getUserById,
    getUserByName,
    getUserByEmail,
    createExercise,
    createWorkout,
    updateCompleted,
} from '../db/model';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');

import { Session } from 'express-session';

export interface ISession extends Session {
    _id?: any;
    email?: string;
}

const route = Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.post('/login', async function (req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
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
            (req.session as ISession).email = user.email;
        }

        res.status(200).json({
            user: user,
            id: (req.session as ISession)._id,
        });
    } catch (error) {
        console.error('Unable to log in', error);
        return res.status(500).json({
            message: 'Unable to log in',
        });
    }
});

route.get('/login', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        const _id = (req.session as ISession)._id;

        const userDetails = await getUserById(_id);
        console.log(userDetails);

        return res.status(200).json({
            id: (req.session as ISession)._id,
            userDetails: userDetails,
        });
    }
});

route.get('/userExists', async function (req: Request, res: Response) {
    try {
        const { username, email } = req.query;

        if (!username && !email) {
            return res.status(400).json({
                message: 'Please provide a username or email',
            });
        }

        let user;
        if (username) {
            user = await getUserByName(username.toString());
        } else {
            user = await getUserByEmail(email.toString());
        }

        if (user) {
            return res.status(200).json({
                message: 'User exists',
                user: user,
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Could not check for account availability',
        });
    }
});

route.post('/workoutInformation', async function (req: Request, res: Response) {
    const { interests, fitnessLevel, name, sets, reps } = req.body;
    const exer = {
        interests: interests,
        fitnessLevel: fitnessLevel,
        name: name,
        sets: sets,
        reps: reps,
    };
    console.log(exer);
    await createExercise({
        exercise: exer,
    });
    return res.status(200).json({
        message: 'Exercise added',
    });
});

route.get(
    '/workoutInformation',
    async function (req: Request, res: Response) {}
);

route.post('/createWorkout/:_id', async function (req: Request, res: Response) {
    const workoutData = req.body;
const userId = req.params._id;

User.findById(userId)
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.workoutsForToday.push(workoutData);

    user.save()
        .then((updatedUser) => {
           if (!updatedUser) {
            return res.status(404).json({ message: 'User cannot be updated' });
        }
        console.log(updatedUser);
        return res.status(200).json({ message: 'Workout created' });
    
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

});

route.get('/workoutCompleted/:_id/:_id', async function (req: Request, res: Response) {
    const userId = req.params.id
    const workoutId = req.params.id
    await updateCompleted(userId,workoutId)
});

route.post('/register', async function (req: Request, res: Response) {
    try {
        const { user } = req.body;

        const email = user.email;
        const password = user.password;
        const name = user.name;
        const settings = user.settings;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        } else {
            const userExists = await getUserByEmail(email);
            if (userExists) {
                console.error('User email already exists');
                return res
                    .status(400)
                    .json({ message: 'Email already exists' });
            } else {
                await createUser({
                    email,
                    name,
                    password,
                    settings: settings,
                });
                return res.status(200).json({
                    message: 'created account',
                });
            }
        }
    } catch (error) {
        console.error(`Unable to register: ${error.message}`);
        return res.status(500).json({
            message: 'Could not create account',
        });
    }
});

route.get('/logout', async function (req: Request, res: Response) {
    if ((req.session as ISession)._id) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/auth/login');
            }
        });
    }
});
// use this route to implement the update seen greating. Link that to the skip button and the user will only see the form once
route.put(
    '/greetingModal/:_id/boarded',
    async function (req: Request, res: Response) {
        if ((req.session as ISession)._id) {
            const _id = req.params._id;
            const updated = updateOnBoarded(_id);

            res.status(200).json({ message: 'Value updated' });
        }
    }
);

export default route;
