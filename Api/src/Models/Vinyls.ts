import {Model, DataTypes} from "sequelize";
import {sequelize} from "../db";
import { UUID } from "crypto";
export class Vinyl extends Model {
    public id!: UUID;
    public title!: string;
    public year!: number;
    public genre!: string;
    public cover_image!: string;
    public style!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Vinyl.init(
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        year:{
            type: DataTypes.NUMBER
        },
        genre:{
            type: DataTypes.STRING,
        },
        cover_image:{
            type: DataTypes.STRING
        },
        style:{
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName: 'Vinyl',
        timestamps: true,
    }
    )
    /*
    country
    year
    id
    genre
    style
    title
    cover_image
    De resource_url viene:
    artists 
    tracklist */