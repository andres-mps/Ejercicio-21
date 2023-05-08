require("dotenv").config();
const { Sequelize } = require("sequelize");
//const runAllSeeders = require("../seeders/runAllSeeders.js");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

Article.belongsTo(User);
User.hasMany(Article);

Comment.belongsTo(Article);
Article.hasMany(Comment);

sequelize.sync({ alter: true });

//sequelize.sync({ alter: true }); //comentada para que no se ejecute cada vez que hay cambios
//insertar datos de prueba
//runAllSeeders();
// npm run tables-*/

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
