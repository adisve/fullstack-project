import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
const uri: string = process.env.ATLAS_URI || '';

function connect() {
    mongoose.Promise = global.Promise;
    return mongoose.connect(uri);
};

export { connect }


