const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
    Comment.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(50),
        },
        content: {
          type: DataTypes.STRING(800),
          allowNull: false,
        },
      },
      { sequelize, modelName: "comment", timestamps: false }
    );
    return Comment;
  }
}

module.exports = Comment;
