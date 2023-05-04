"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getEmail = exports.createUser = exports.workoutModel = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: new Date(), required: true },
    greeting_model: { type: Boolean, required: true }
});
const workoutSchema = new mongoose_1.default.Schema({
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        }
        next();
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const workoutModel = mongoose_1.default.model('WorkoutInformation', workoutSchema);
exports.workoutModel = workoutModel;
const createUser = (values) => new User(values).save().then((User) => User.toObject());
exports.createUser = createUser;
const getUsers = User.find();
exports.getUsers = getUsers;
const getEmail = (email) => User.findOne({ email: email });
exports.getEmail = getEmail;
//# sourceMappingURL=model.js.map