import { DataTypes, Model, Sequelize } from 'sequelize';

class Review extends Model {
  public id!: number;
  public name!: string; 
  public email!: string;     
  public country!: string;   
  public comment!: string | null;
  public createdAt!: Date;
}

const initReview = (sequelize: Sequelize) => {
  Review.init(
    {
      name: {             
        type: DataTypes.STRING, 
        allowNull: false,
      },
      email: {                
        type: DataTypes.STRING, 
        allowNull: false,
      },
      country: {               
        type: DataTypes.STRING, 
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
      timestamps: false
    }
  );
};

export { initReview, Review };