import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './db/connection';
dotenv.config({ path: './config.env' });
const secret: string = process.env.SECRET_KEY || '';

const app: Application = express();
const port: string | number = process.env.PORT || 7036;
import session from 'express-session'
import authRoute from './routes/auth';



app.use(cors());
app.set('trust proxy', true);
app.use(express.json());

app.use(session({
    secret: secret,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: false,
saveUninitialized:false})
    
)

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

app.listen(port, () => {
    connect()
        .then(() => {
            console.log(`Server is running on port: ${port}`);
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
});

