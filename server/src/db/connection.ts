import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';
dotenv.config({ path: './config.env' });
const uri: string = process.env.ATLAS_URI || '';
const client: MongoClient = new MongoClient(uri);

let _userDb: Db;
let _workoutInfoDb: Db;

export const connect = async () => {
    try {
        await client.connect();
        _userDb = client.db('users');
        _workoutInfoDb = client.db('workoutinformation');
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUsersDb = async () => {
    return _userDb;
};

export const getWorkoutInfoDb = async () => {
    return _workoutInfoDb;
};
