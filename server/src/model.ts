import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt'


// creating user model 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date(), required: true }  
})  

// creating workout models

const workoutSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  exercise: {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: {type: Number, required: true}
  },
 created_at:{type: Date, required: true}
  
})

const saltRounds = 10

userSchema.pre('save', async function (next) {
 const user = this;
 if (user.isModified('password')) {
   user.password = await bcrypt.hash(user.password, saltRounds);
 }
 next();
});

// Converting schema into a model
export const User = mongoose.model('User', userSchema);
export const workoutModel = mongoose.model('WorkoutInformation', workoutSchema);

// To create user
export const createUser = (values: Record<string, any>) => new User(values).save().then((User) => User.toObject()); 

// find user 
export const getUsers = User.find();
export const getEmail = (email: String) => User.findOne({ email: email })
export const getSessionToken = (sessionToken: String) => User.findOne({'authentication.sessionToken': sessionToken })






 