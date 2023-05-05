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
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { sequelize, modelName: "articles" }
);

class Author extends Model {}
Author.init(
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
  { sequelize, modelName: "authors" }
);

class Coment extends Model {}
Coment.init(
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
  { sequelize, modelName: "coments", timestamps: false }
);

sequelize.sync({ alert: true });

async function viewHome(req, res) {
  res.render("home");
}

async function viewAdmin(req, res) {
  res.render("admin");
}

async function viewArticle(req, res) {
  res.render("article");
}

module.exports = {
  viewHome,
  viewAdmin,
  viewArticle,
};
