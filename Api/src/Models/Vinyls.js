"use strict";
<<<<<<< HEAD
=======
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vinyl = exports.initVinylModel = void 0;
const sequelize_1 = require("sequelize");
class Vinyl extends sequelize_1.Model {
}
exports.Vinyl = Vinyl;
const initVinylModel = (sequelize) => {
    Vinyl.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        idApi: {
            type: sequelize_1.DataTypes.INTEGER
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: sequelize_1.DataTypes.INTEGER
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
            type: sequelize_1.DataTypes.INTEGER
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER
        }
    }, {
        sequelize,
        tableName: 'Vinyl',
        timestamps: true,
    });
};
exports.initVinylModel = initVinylModel;
>>>>>>> a6c35d20565fda938591a7504dbe2eadcf30160b
