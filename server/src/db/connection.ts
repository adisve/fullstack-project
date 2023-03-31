import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const uri: string = process.env.ATLAS_URI || '';
const db_name: string = process.env.DATABASE_NAME || '';
const client: MongoClient = new MongoClient(uri);

let _db: Db;

export const connectToServer = async (callback: (err?: Error) => void) => {
    client
        .connect()
        .then((client: MongoClient) => {
            _db = client.db(db_name);
            console.log(`Successfully connected to database: ${db_name}`);
        })
        .catch((err: Error) => callback(err));
};

export const getDb = (): Db => {
    return _db;
};
