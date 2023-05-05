const { Model, DataTypes } = require("sequelize");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(1500),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
