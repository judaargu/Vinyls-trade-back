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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const Users_1 = require("../../Models/Users");
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const userFind = yield Users_1.Users.findOne({
            where: {
                name
            }
        });
        if (userFind) {
            yield Users_1.Users.destroy({
                where: {
                    name,
                }
            });
            res.status(200).send(`se ha eliminado al usuario ${name}`);
        }
        else {
            res.status(400).json({ message: 'No se ha encontrado el usuario para eliminar' });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Ha fallado la eliminación del usuario' });
    }
});
exports.deleteUser = deleteUser;
exports.default = exports.deleteUser;
