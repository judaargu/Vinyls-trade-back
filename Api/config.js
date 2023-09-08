"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.URL = exports.TOKEN = exports.DB_NAME = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_HOST = _a.DB_HOST, exports.DB_NAME = _a.DB_NAME, exports.TOKEN = _a.TOKEN, exports.URL = _a.URL, exports.GOOGLE_CLIENT_ID = _a.GOOGLE_CLIENT_ID, exports.GOOGLE_CLIENT_SECRET = _a.GOOGLE_CLIENT_SECRET;
