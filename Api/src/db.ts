import { Sequelize } from 'sequelize';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } from '../config'; // Asegúrate de que tienes tu archivo config.ts con los valores de entorno
import {initOrderModel, Order} from './Models/Order';
import {initUsersModel ,Users} from './Models/Users';
import {initVinylModel ,Vinyl} from './Models/Vinyls';
import {initOrderDetail ,OrderDetail} from './Models/orderDetail';

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, 
    native: false, 
});

initOrderModel(sequelize)
initUsersModel(sequelize)
initVinylModel(sequelize)
initOrderDetail(sequelize)
// * Relaciones
const UserVinyls = sequelize.define("UserVinyls",{});

Users.belongsToMany(Vinyl, {through: UserVinyls});
Vinyl.belongsToMany(Users, {through: UserVinyls});

Users.hasOne(Order,{foreignKey: "id"});
Order.hasOne(Users,{foreignKey: "id"});

Users.hasOne(Users, {foreignKey: "id"})
Order.hasMany(OrderDetail, {
    sourceKey: "id",
    foreignKey: "id"
});
OrderDetail.belongsTo(Order, {
    foreignKey: "id",
})

export {sequelize};
