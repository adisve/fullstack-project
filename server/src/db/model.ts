import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userProfileSchema = new mongoose.Schema({
    interests: { type: Array, required: false },
    goals: { type: Array, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    weight: { type: Number, required: false },
    height: { type: Number, required: false },
    fitnessLevel: { type: String, required: false },
    Exercise: [{ type: mongoose.Types.ObjectId, ref: 'Exercise' }]
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date(), required: true },
    seen_greeting_modal: { type: Boolean, default: false },
    userProfileSchema: userProfileSchema,
});

const saltRounds = 10;

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

const exerciseSchema = new mongoose.Schema({
        interests: { type: String, required: true },
        fitnessLevel: { type: String, required: true },
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },


});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

const createUser = (values: Record<string, any>) =>
    new User(values).save().then((User) => User.toObject());

// const createExercise = (values: Record<string, any>) =>
//     new Exercise(values)
//         .save()
//         .then((Exercise) => Exercise.toObject());

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

async function createExercises() {
    const fitnessLevel = ['beginner', 'intermediate', 'expert'];
    const interests = [
        'Cardiovascular',
        'Weightloss',
        'Stamina',
        'Strength building',
    ];

    const exerciseTypes = [
        'pushups',
        'pullups',
        'lunges',
        'mountain climbers',
        'squats',
        'shoulder press',
    ];
    const exerciseCount = 10;
    const beginnerReps = 20;
    const intermediateReps = 35;
    const expertReps = 50;

    const sets = 3;
    const exercises = [];
    for (let i = 0; i < exerciseCount; i++) {
        const test =
            fitnessLevel[Math.floor(Math.random() * fitnessLevel.length)];
        let repss = -1;
        if (test === 'beginner') {
            repss = beginnerReps;
        } else if (test === 'intermediate') {
            repss = intermediateReps;
        } else {
            repss = expertReps;
        }
        const exercise = {
                interests:
                    interests[Math.floor(Math.random() * interests.length)],
                fitnessLevel: test,
                name: exerciseTypes[
                    Math.floor(Math.random() * exerciseTypes.length)
                ],
                sets: sets,
                reps: repss,
          
        };
        exercises.push(exercise);
    }
    const insertExercise = await Exercise.insertMany(exercises);
    console.log(exercises);
}
export {
    User,
    Exercise,
    createUser,
    getEmail,
    getUser,
    updateUser,
    UserProfile,
    updateSeenGreeting,
    createExercises,
};
