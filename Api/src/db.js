"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config"); // Asegúrate de que tienes tu archivo config.ts con los valores de entorno
const Order_1 = require("./Models/Order");
const Users_1 = require("./Models/Users");
const Vinyls_1 = require("./Models/Vinyls");
const orderDetail_1 = require("./Models/orderDetail");
const Reviews_1 = require("./Models/Reviews");
const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.DB_USER}:${config_1.DB_PASSWORD}@${config_1.DB_HOST}/${config_1.DB_NAME}`, {
    logging: false,
    native: false,
});
exports.sequelize = sequelize;
(0, Order_1.initOrderModel)(sequelize);
(0, Users_1.initUsersModel)(sequelize);
(0, Vinyls_1.initVinylModel)(sequelize);
(0, orderDetail_1.initOrderDetail)(sequelize);
(0, Reviews_1.initReview)(sequelize);
// * Relaciones
const UserVinyls = sequelize.define("UserVinyls", {});
Users_1.Users.belongsToMany(Vinyls_1.Vinyl, { through: UserVinyls });
Vinyls_1.Vinyl.belongsToMany(Users_1.Users, { through: UserVinyls });
Users_1.Users.hasOne(Order_1.Order, { foreignKey: "id" });
Order_1.Order.hasOne(Users_1.Users, { foreignKey: "id" });
Users_1.Users.hasOne(Users_1.Users, { foreignKey: "id" });
Order_1.Order.hasMany(orderDetail_1.OrderDetail, {
    sourceKey: "id",
    foreignKey: "id"
});
orderDetail_1.OrderDetail.belongsTo(Order_1.Order, {
    foreignKey: "id",
});
