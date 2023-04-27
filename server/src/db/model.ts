import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userProfileSchema = new mongoose.Schema({
    exercise: { type: Array, required: false },
    goals: { type: Array, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    weight: { type: Number, required: false },
    height: { type: Number, required: false },
    fitnessLevel: { type: String, required: false },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date(), required: true },
    // user_Profile: { type: mongoose.Types.ObjectId, ref: 'UserProfile'}
    userProfileSchema: userProfileSchema,
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

const User = mongoose.model('User', userSchema);
const workoutModel = mongoose.model('WorkoutInformation', workoutSchema);

const saltRounds = 10;

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

const createUser = (values: Record<string, any>) =>
    new User(values).save().then((User) => User.toObject());

const getUsers = User.find();
const getEmail = (email: String) => User.findOne({ email: email });
const updateUser = (
    _id: String,
    interests: Array<String>,
    goals: Array<String>,
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    fitnessLevel: String
) =>
    User.findByIdAndUpdate(
        _id,
        {
            $set: {
                userProfileSchema: {
                    interests: interests,
                    goals: goals,
                    age: age,
                    gender: gender,
                    weight: weight,
                    height: height,
                    fitnessLevel: fitnessLevel,
                },
            },
        },
        { upsert: true }
    );

export {
    User,
    workoutModel,
    createUser,
    getEmail,
    getUsers,
    updateUser,
    UserProfile,
};
