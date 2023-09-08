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
exports.deleteVinyl = void 0;
const Vinyls_1 = require("../../Models/Vinyls");
const Users_1 = require("../../Models/Users");
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
const sequelize = new sequelize_1.Sequelize(`${config_1.DB_NAME}`, `${config_1.DB_USER}`, `${config_1.DB_PASSWORD}`, {
    dialect: "postgres",
    host: `${config_1.DB_HOST}`,
});
const userVinyls = sequelize.model("UserVinyls");
const deleteVinyl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.UserId;
        const vinylId = req.params.VinylId;
        const user = yield Users_1.Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "El usuario no existe" });
        }
        const vinylRelation = yield userVinyls.findOne({
            where: {
                UserId: userId,
                VinylsId: vinylId,
            },
        });
        if (!vinylRelation) {
            return res.status(401).send("No tienes permiso para eliminar ese vinilo");
        }
        yield Vinyls_1.Vinyl.destroy({
            where: {
                id: vinylId,
            },
        });
        // const vinylFind = await Vinyl.findOne({
        //     where : {
        //         title
        //     }
        // })
        // if (vinylFind?.idApi !== undefined) {
        //     return res.status(402).send('No puedes eliminar un vinilo ya existente');
        // }
        // if(vinylFind) {
        //     await vinylFind.destroy();
        //     res.status(200).send(`se ha eliminado al vinilo ${title}`)
        // } else {
        //     res.status(400).json({message: 'No se ha encontrado el vinilo para eliminar'})
        // }
    }
    catch (error) {
        res.status(401).json({ message: "Ha fallado la eliminación del vinilo" });
    }
});
exports.deleteVinyl = deleteVinyl;
exports.default = exports.deleteVinyl;
