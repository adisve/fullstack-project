import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSettingsSchema = new mongoose.Schema({
    interests: { type: Array, required: true },
    goals: { type: Array, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    fitnessLevel: { type: String, required: true },
});

const UserProfile = mongoose.model('UserProfile', userSettingsSchema);

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date(), required: true },
    workoutModel: [{ type: mongoose.Types.ObjectId, ref: 'workoutModel' }],
    settings: userSettingsSchema,
    role: {
        type: String,
        enum: ['user', 'admin'],
    },
});

const saltRounds = 10;

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

const workoutSchema = new mongoose.Schema({
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
const Workout = mongoose.model('WorkoutInformation', workoutSchema);

const createUser = (values: Record<string, any>) =>
    new User(values).save().then((User) => User.toObject());

const createExercise = (values: Record<string, any>) =>
    new Workout(values).save().then((workoutModel) => workoutModel.toObject());

const getUser = (_id: String) => User.find({ _id: _id });
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
const updateSeenGreeting = async (id) => {
    try {
        const updatedResult = await User.findByIdAndUpdate(
            { _id: id },
            {
                seen_greeting_modal: true,
            }
        );
        console.log(updatedResult);
    } catch (error) {
        console.log(error);
    }
};

export {
    User,
    Workout,
    createUser,
    getEmail,
    getUser,
    updateUser,
    UserProfile,
    createExercise,
    updateSeenGreeting,
};
