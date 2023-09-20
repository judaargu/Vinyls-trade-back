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
exports.getVinylsController = exports.getVinylById = exports.postVinylsController = exports.getAllVinyls = void 0;
const Vinyls_1 = require("../../Models/Vinyls");
const Users_1 = require("../../Models/Users");
const postVinylsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "5a6ec8f4-1e04-49c1-862a-bb35f1197e10";
    try {
        // Busca al usuario por su userId
        const user = yield Users_1.Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const allVinyls = yield Vinyls_1.Vinyl.findAll();
        // Asocia todos los vinilos al usuario
        // await user.addVinyls(allVinyls);
        res.status(200).json({ message: 'All vinyls associated with the user.' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
});
exports.postVinylsController = postVinylsController;
const getVinylsController = () => __awaiter(void 0, void 0, void 0, function* () {
    const findVinyls = yield Vinyls_1.Vinyl.findAll({
        include: [
            {
                model: Users_1.Users,
                as: 'Users',
                through: {
                    attributes: ['createdAt', 'UserId', 'VinylId']
                }
            }
        ]
    });
    // Mapear y limpiar la respuesta
    const cleanedVinyls = findVinyls.map((vinyl) => {
        const { Users } = vinyl;
        if (Users && Users.length > 0) {
            return Object.assign(Object.assign({}, vinyl.toJSON()), { Users: Users.map((user) => ({
                    UserVinyls: user.UserVinyls
                })) });
        }
        else {
            return vinyl.toJSON();
        }
    });
    return cleanedVinyls;
});
exports.getVinylsController = getVinylsController;
const getAllVinyls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getVinylsController();
        // fs.writeFileSync('data.json', JSON.stringify(response, null, 2));
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
});
exports.getAllVinyls = getAllVinyls;
const getVinylById = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = param;
    try {
        let vinyl = yield Vinyls_1.Vinyl.findAll({ where: { id } });
        return { status: 200, json: vinyl };
    }
    catch (error) {
        return { status: 500, json: 'El vinilo no existe' };
    }
});
exports.getVinylById = getVinylById;
