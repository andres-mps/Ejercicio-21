const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    "ejercicio_blog_21",
    "root",
    "50137667",
    {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
});


class Article extends Model {};
Article.init({
        id:{
            type: DataTypes.BIGINT.UNSIGNED,  
            primaryKey: true,
            autoIncrement: true,
        },
        title : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        author:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

    },
{ sequelize, modelName: "articles"}
);

sequelize.sync({alert:true})

class Author extends Model {};
Author.init({
        id:{
            type: DataTypes.BIGINT.UNSIGNED,  
            primaryKey: true,
            autoIncrement: true,
        },
        firstname : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

    },
{ sequelize, modelName: "authors"}
);

sequelize.sync({alert:true})

class Coment extends Model {};
Coment.init({
        id:{
            type: DataTypes.BIGINT.UNSIGNED,  
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING(800),
            allowNull: false,
        },

    },
{ sequelize, modelName: "coments", timestamps:false}
);

sequelize.sync({alert:true})

async function viewAdmin(req,res){
    
    res.render("admin");
};

async function viewArticle(req,res){
    res.render("article");
};

module.exports ={
    viewAdmin,
    viewArticle

};