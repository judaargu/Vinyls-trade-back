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
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../../Models/Users");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = userData;
        const userFound = yield Users_1.Users.findOne({ where: { email } });
        if (userFound) {
            return {
                status: 400,
                data: { message: 'El correo electrónico ya está registrado' },
            };
        }
        const securityLevel = 10;
        const encryptedPassword = yield bcrypt_1.default.hash(password, securityLevel);
        const newUser = yield Users_1.Users.create({
            name,
            email,
            password: encryptedPassword,
        });
        return {
            status: 201,
            data: newUser,
        };
    }
    catch (error) {
        console.error('Ha ocurrido un error al crear el usuario:', error);
        return {
            status: 500,
            data: { message: 'Error interno del servidor' },
        };
    }
});
exports.createUser = createUser;
exports.default = exports.createUser;
