import { Sequelize } from 'sequelize';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } from '../config'; // Asegúrate de que tienes tu archivo config.ts con los valores de entorno

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, 
    native: false, 
});


export {sequelize};
