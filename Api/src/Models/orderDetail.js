"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = exports.initOrderDetail = void 0;
const sequelize_1 = require("sequelize");
class OrderDetail extends sequelize_1.Model {
}
exports.OrderDetail = OrderDetail;
const initOrderDetail = (sequelize) => {
    OrderDetail.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        vinylId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        units: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        amount: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        taxAmount: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        totalAmount: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        orderStatus: {
            type: sequelize_1.DataTypes.STRING(6),
            defaultValue: "Cart",
        },
        updated: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: "OrderDetail",
        paranoid: true,
    });
};
exports.initOrderDetail = initOrderDetail;
