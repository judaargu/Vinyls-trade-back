import {Model, DataTypes, Sequelize} from "sequelize";

import { UUID } from "crypto";
class Vinyl extends Model {
    public id!: UUID;
    public idApi!: number;
    public title!: string;
    public year!: number;
    public genre!: string;
    public cover_image!: string;
    public style!: string;
    public stock!: number;
    public price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

const initVinylModel = (sequelize: Sequelize) => {
    Vinyl.init(
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        idApi:{
            type: DataTypes.INTEGER
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        year:{
            type: DataTypes.INTEGER
        },
        genre:{
            type: DataTypes.STRING,
        },
        cover_image:{
            type: DataTypes.STRING
        },
        style:{
            type: DataTypes.STRING
        },
        stock:{
            type: DataTypes.INTEGER
        },
        price:{
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        tableName: 'Vinyl',
        timestamps: true,
        paranoid: true,
    }
    )
}
    export {initVinylModel, Vinyl};
