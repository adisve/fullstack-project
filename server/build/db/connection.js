"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const uri = process.env.ATLAS_URI || '';
function connect() {
    mongoose_1.default.Promise = global.Promise;
    return mongoose_1.default.connect(uri);
}
exports.connect = connect;
//# sourceMappingURL=connection.js.map