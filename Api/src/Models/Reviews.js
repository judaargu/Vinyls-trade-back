"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.initReview = void 0;
const sequelize_1 = require("sequelize");
class Review extends sequelize_1.Model {
}
exports.Review = Review;
const initReview = (sequelize) => {
    Review.init({
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        vinylId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Review',
    });
};
exports.initReview = initReview;
