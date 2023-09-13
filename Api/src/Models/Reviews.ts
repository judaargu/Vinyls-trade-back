import { DataTypes, Model, Sequelize } from 'sequelize';

class Review extends Model {
  public id!: number;
  public userId!: number;
  public vinylId!: number;
  public rating!: number;
  public comment!: string | null;
  public createdAt!: Date;
}

const initReview = (sequelize: Sequelize) => {
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vinylId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
};

export { initReview, Review };