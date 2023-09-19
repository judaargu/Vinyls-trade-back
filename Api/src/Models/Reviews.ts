import { DataTypes, Model, Sequelize } from 'sequelize';

class Review extends Model {
  public id!: number;
  public email!: string;     
  public comment!: string | null;
  public rating!: number;
  public createdAt!: Date;
}

const initReview = (sequelize: Sequelize) => {
  Review.init(
    {
      email: {                
        type: DataTypes.STRING, 
        allowNull: false,
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      timestamps: false
    }
  );
};

export { initReview, Review };