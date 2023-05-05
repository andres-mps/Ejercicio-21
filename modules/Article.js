const { Model, DataTypes } = require("sequelize");

class Article extends Model {}
Article.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1500),
      allowNull: false,
    },
  },
  { sequelize, modelName: "article" }
);

module.exports = Article;
