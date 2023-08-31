import { Model, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from "../db";

class Order extends Model {
  declare id: string;
  declare userId: ForeignKey<number>;
  declare detail: object[];
  declare tax: number | null;
  declare total: number;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    detail: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    sequelize,
    timestamps: false,
  }
);

export default Order;
