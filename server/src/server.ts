import express, { Application } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import route from './routes/registerRoute'
import routes from './routes/loginRoute';
import routee from './routes/currentUser'
import { connect } from './db/connection';
import { createUser, getEmail, getUsers, User, workoutModel } from './model';
import bcrypt from 'bcrypt';
dotenv.config({ path: './config.env' });
import jwt from 'jsonwebtoken'
const secretKey: string = process.env.SECRET_KEY || '';



const app: Application = express();
const port: string | number = process.env.PORT || 7036;

app.use(cors());
app.use(routes);
app.use(route);
app.use(routee)
app.set('trust proxy', true) // trust first proxy
app.use(express.json());

app.use(cookieSession({
    signed: false,
    name:'session',
    maxAge: 30 * 24 * 60 * 60,
    keys: ['secretKey']
})
);


app.listen(port, () => {
    connect();
    console.log(`Server is running on port: ${port}`);
});



export const register = async(req: express.Request, res: express.Response) =>{
    connect()
    try {
       
        // const { email, password, name } = req.body
        const { email, password, name } = {
            email: "xyz@gmail.com",
            name: "Anam",
            password: "aaa"
        }
       
// used when the info is coming from front end
        // const { email, password, name } = {
        //     email: req.body.email,
        //     name: req.body.name,
        //     password: req.body.password
        // }
       
        if (!email || !password || !name) {
            return res.sendStatus(400)
        }
        else {
            const userExists = await getEmail(email)
            if (userExists) {
                console.log(" User email already exists")
                return res.sendStatus(400)
            } else {
                console.log("There as well")
                const user = await createUser({
                    email,
                    name,
                    password
                })
                const userJwt = jwt.sign(
                    {
                        name: user.name,
                        email: user.email
                    },
                   secretKey
                );

                // Store it in session object
                req.session = {
                    jwt: userJwt
                };
                req.session.save();
                res.cookie('Cookie', req.session)
                return res.send(user)

                
                 
                // return res.sendStatus(200).json(user).end()
            
            }
        }
        

    } catch (error) { 
        console.log("Unable to register")
        return res.sendStatus(400)
    }  
}

export const login = async (req: express.Request, res: express.Response) => {
    connect()
    try {
        const { email, password } = { email: 'xyz@gmail.com', password: 'aaa' }
        // used when the data is being retrieved from frontend
        // const { email, password } = {email: req.body.email, password: req.body.password}
        
        if (!email || !password) {
            return res.sendStatus(400)
        }

        const user = await getEmail(email)

        if (!user) {
            console.log("no such user exist")
        
            return res.sendStatus(400)
        } else {
            console.log("Match found")
            console.log(user.password)
            console.log(password)
            const isMatch = bcrypt.compareSync(password, user.password);
            

            //generating the jwt token

            if (isMatch) {
                const userJwt = jwt.sign(
                    {
                        name: user.name,
                        email: user.email
                    },
                   secretKey
                );

                // Store it in session object
                req.session = {
                    jwt: userJwt
                };
                console.log(req.session)
                await user.save();
                
                res.cookie('Cookie', req.session)

                res.status(200).send(user);
             
            }
            //      const token = jwt.sign({ name: user.name?.toString(), email: user.email }, secretKey, {
            //        expiresIn: '2 days',
            //      });

            //      return { user: { name:String, password:String }, token: token }
            //      }
            //  else {
            //      throw new Error('Password is not correct');
            //             }
            //         }
            //     } catch (error) {
            //         console.log("cannot find the user")
            //     }
        }
    } catch (error) {
        console.log("cannot find the user")
    }
}
