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
const express_1 = require("express");
const model_1 = require("../db/model");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config({ path: './config.env' });
const router = (0, express_1.Router)();
router.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, model_1.getEmail)(email);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            const isMatch = bcrypt_1.default.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Invalid credentials',
                });
            }
            else {
                req.session._id = user._id;
                req.session.Email = user.email;
            }
            res.status(200).json({
                user: user,
            });
        }
        catch (error) {
            console.error('Unable to log in', error);
            return res.status(500).json({
                message: 'Unable to log in',
            });
        }
    });
});
router.post('/register', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name) {
                return res.status(400).json({
                    message: 'Invalid email or password',
                });
            }
            else {
                const userExists = yield (0, model_1.getEmail)(email);
                if (userExists) {
                    console.error('User email already exists');
                    return res
                        .status(400)
                        .json({ message: 'Email already exists' });
                }
                else {
                    const user = yield (0, model_1.createUser)({
                        email,
                        name,
                        password,
                    });
                    return res.status(200).json({
                        message: 'created account',
                    });
                }
            }
        }
        catch (error) {
            console.error('Unable to register');
            return res.status(400).json({
                message: 'Could not create account',
            });
        }
    });
});
router.get('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session._id) {
            return res.status(200).json({ id: req.session._id });
        }
        res.end();
    });
});
router.get('/logout', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/auth/login');
            }
        });
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map