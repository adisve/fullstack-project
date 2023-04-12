// import { MongoClient, Db } from 'mongodb';
import {User} from '../model'
import * as Mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const uri: string = process.env.ATLAS_URI || '';
const db_name: string = process.env.DATABASE_NAME || '';
// const client: MongoClient = new MongoClient(uri);
let database: Mongoose.Connection;


// let _db: Db;

export const connect = async() => {
    await Mongoose.connect(uri);
    console.log("database connected")
// const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     password: '2345'
//   });
//   await user.save();
}

// export const connect = () => {
//     if (database) {
//         return
//     }
//     Mongoose.connect(uri);
//     database = Mongoose.connection;
//     database.once("open", async () => {
//         console.log("Connected to database");
//     });
//     database.on("error", () => {
//         console.log("Error connecting to database");
//     });

// }
// export const connectToServer = async (callback: (err?: Error) => void) => {
//     client
//         .connect()
//         .then((client: MongoClient) => {
//             _db = client.db(db_name);
//             console.log(`Successfully connected to database: ${db_name}`);
//         })
//         .catch((err: Error) => callback(err));
// };

// export const getDb = (): Db => {
//     return _db;
// };
