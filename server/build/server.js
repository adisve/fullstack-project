"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./db/connection");
dotenv_1.default.config({ path: './config.env' });
const secret = process.env.SECRET_KEY || '';
const app = (0, express_1.default)();
const port = process.env.PORT || 7036;
const express_session_1 = __importDefault(require("express-session"));
const auth_1 = __importDefault(require("./routes/auth"));
app.use((0, cors_1.default)());
app.set('trust proxy', true);
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: secret,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/auth', auth_1.default);
app.listen(port, () => {
    (0, connection_1.connect)()
        .then(() => {
        console.log(`Server is running on port: ${port}`);
    })
        .catch((err) => {
        console.error(err);
        throw err;
    });
});
//# sourceMappingURL=server.js.map