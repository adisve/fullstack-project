import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date(), required: true },
});

const workoutSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    exercise: {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
    },
    created_at: { type: Date, required: true },
});

const saltRounds = 10;

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

export const User = mongoose.model('User', userSchema);
export const workoutModel = mongoose.model('WorkoutInformation', workoutSchema);

export const createUser = (values: Record<string, any>) =>
    new User(values).save().then((User) => User.toObject());

export const getUsers = User.find();
export const getEmail = (email: String) => User.findOne({ email: email });
export const getSessionToken = (sessionToken: String) =>
    User.findOne({ 'authentication.sessionToken': sessionToken });
