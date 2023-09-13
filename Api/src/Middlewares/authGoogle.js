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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("../../config");
const Users_1 = require("../Models/Users");
passport_1.default.use("Auth-google", new passport_google_oauth20_1.Strategy({
    clientID: config_1.GOOGLE_CLIENT_ID || '',
    clientSecret: config_1.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "https://vinyls-trade-back-production.up.railway.app/auth/google" || "http://localhost:3001/auth/google"
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
            const user = yield Users_1.Users.findOne({ where: { email: profile.emails[0].value } });
            if (user) {
                return cb(null, user);
            }
            else {
                return cb(new Error('No se encontró un correo electrónico válido en el perfil.'), undefined);
            }
        }
    }
    catch (error) {
        return cb(new Error('Algo salió mal en el servidor'), undefined);
    }
})));
