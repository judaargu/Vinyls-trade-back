import { DataTypes, Model, Sequelize } from "sequelize";

class Users extends Model {
  public id!: string;
  public name!: string;
  public email?: string;
  public password?: string;
  public codArea?: string;
  public phoneNumber?: string;
  public city?: string;
  public country?: string;
}

const initUsersModel = (sequelize: Sequelize) => {
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
      codArea: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: false,
      paranoid: true,
    }
  );
};

export { initUsersModel, Users };
