require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Se ha entablado una conexión");
  })
  .catch((error) => {
    console.log(error);
  });

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

class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(800),
      allowNull: false,
    },
  },
  { sequelize, modelName: "comment", timestamps: false }
);

Article.belongsTo(User);
User.hasMany(Article);

Comment.belongsTo(Article);
Article.hasMany(Comment);

User.hasMany(Comment);
Comment.belongsTo(User);

sequelize.sync({ force: true }); //comentada para que no se ejecute cada vez que hay cambios
//insertar datos de prueba
// npm run tables-
async function viewAdmin(req, res) {
  res.render("admin");
}

async function viewArticle(req, res) {
  res.render("article");
}

module.exports = {
  viewAdmin,
  viewArticle,
};
