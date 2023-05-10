import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date(), required: true },
    settings: {
        interests: { type: Array, required: true },
        goal: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, required: true },
        weight: { type: Number, required: true },
        height: { type: Number, required: true },
        fitnessLevel: { type: String, required: true },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

const exerciseSchema = new mongoose.Schema({
    date: { type: Date, default: new Date(), required: true },
    exercise: {
        interests: { type: String, required: true },
        fitnessLevel: { type: String, required: true },
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
    },
    created_at: { type: Date, default: new Date(), required: true },
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

const createUser = (values: Record<string, any>) =>
    new User(values).save().then((User) => User.toObject());

const createExercise = (values: Record<string, any>) =>
    new Exercise(values)
        .save()
        .then((exerciseModel) => exerciseModel.toObject());

const getUserById = (_id: String) => User.find({ _id: _id });
const getUserByEmail = (email: String) => User.findOne({ email: email });
const getUserByName = (name: String) => User.findOne({ name: name });

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
                settings: {
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
    Exercise,
    createUser,
    getUserByEmail,
    getUserById,
    getUserByName,
    updateUser,
    createExercise,
};
