import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const exerciseSchema = new mongoose.Schema({
    description:{type: String, required: false},
    interests: { type: String, required: false},
    fitnessLevel: { type: String, required:false},
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

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
 
    onboarded: { type: Boolean, default: false },

    exercises: [exerciseSchema],
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

const User = mongoose.model('User', userSchema);

const createUser = (values: Record<string, any>) =>
    new User(values).save().then((User) => User.toObject());

const createExercise = (values: Record<string, any>) =>
    new User(values)
        .save()
        .then((exercises) => exercises.toObject());

const getUser = (_id: String) => User.find({ _id: _id });
const getEmail = (email: String) => User.findOne({ email: email });

function updateUser(
    _id: String,
    interests: Array<String>,
    goals: Array<String>,
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    fitnessLevel: String
) {
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
}

function updateExercises(
    id,
    interests: String,
    fitnessLevel: String,
    name: String,
    sets: Number,
    reps: Number
) {
    const updatedUser = User.findByIdAndUpdate(
        id,
        {
            $set: {
                exercises: {
                    interests: interests,
                    fitnessLevel: fitnessLevel,
                    name: name,
                    sets: sets,
                    reps: reps,
                },
            },
        },
        { upsert: true, new: true }
    );
    return updatedUser;
}

// updating the updateOnboarded to true if the form is already shown to user and he skipped it
async function updateOnBoarded(id) {
    try {
        const updatedResult = await User.findByIdAndUpdate(
            { _id: id },
            {
                updateOnBoarded: true,
            }
        );
        console.log(updatedResult);
    } catch (error) {
        console.log(error);
    }
}



export {
    User,
    Exercise,
    createUser,
    getEmail,
    getUser,
    updateUser,
    createExercise,
    updateOnBoarded,
    updateExercises,
};
