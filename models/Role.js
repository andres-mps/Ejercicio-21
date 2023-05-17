const { Resolver } = require("dns/promises");
const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: DataTypes.BIGINT.UNSIGNED,
        },
        role: {
          type: DataTypes.STRING(50),
        },
        description: {
          type: DataTypes.STRING(100),
        },
      },
      { sequelize, modelName: "role" },
    );
    return Role;
  }
}

module.exports = Role;
