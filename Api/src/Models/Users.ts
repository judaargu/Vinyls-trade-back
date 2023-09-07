import { DataTypes, Model, Sequelize } from "sequelize";

class Users extends Model {
  public id!: string;
  public name!: string;
  public email?: string;
  public password?: string;

}

const initUsersModel = (sequelize: Sequelize) =>{
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
    modelName: "Users",
    paranoid: true,
  }
);}

export {initUsersModel, Users};
