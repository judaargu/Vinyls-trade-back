import { DataTypes, Model } from "sequelize";
import {sequelize} from "../db"; 

class Users extends Model {
  public id!: string;
  public name!: string;
  public email?: string;
  public password?: string;

}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    
  },
  {
    sequelize,
    modelName: "User",
    timestamps: false,
  }
);

export default Users;