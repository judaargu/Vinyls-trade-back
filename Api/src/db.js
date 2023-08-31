"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config"); // Asegúrate de que tienes tu archivo config.ts con los valores de entorno
const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.DB_USER}:${config_1.DB_PASSWORD}@${config_1.DB_HOST}/${config_1.DB_NAME}`, {
    logging: false,
    native: false,
});
exports.sequelize = sequelize;
