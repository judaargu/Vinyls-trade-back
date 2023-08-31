import { DataTypes, Model } from "sequelize";
import {sequelize} from "../db"; 

class OrderDetail extends Model {
  public id!: string;
  public vinylId!: string;
  public units?: number;
  public amount?: number;
  public taxAmount?: number;
  public totalAmount?: number;
  public orderStatus!: string;
  public updated!: Date;
}

OrderDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    vinylId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    units: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    taxAmount: {
      type: DataTypes.FLOAT,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
    },
    orderStatus: {
      type: DataTypes.STRING(6),
      defaultValue: "Cart",
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "OrderDetail",
    timestamps: false,
  }
);

export default OrderDetail;
