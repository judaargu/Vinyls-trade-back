"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.initUsersModel = void 0;
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
const initUsersModel = (sequelize) => {
    Users.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "Users",
        timestamps: false,
    });
};
exports.initUsersModel = initUsersModel;
