"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vinyl = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class Vinyl extends sequelize_1.Model {
}
exports.Vinyl = Vinyl;
Vinyl.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    idApi: {
        type: sequelize_1.DataTypes.NUMBER
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.NUMBER
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
    },
    cover_image: {
        type: sequelize_1.DataTypes.STRING
    },
    style: {
        type: sequelize_1.DataTypes.STRING
    },
    stock: {
        type: sequelize_1.DataTypes.NUMBER
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'Vinyl',
    timestamps: true,
});
