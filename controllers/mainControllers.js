const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    "ejercicio_21",
    "root",
    "50137667",
    {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
});

async function viewAdmin(req,res){
    res.render("/admin");
};

async function viewArticle(req,res){
    res.render("/article");
};

/*class User extends Model {};
User.init({
        id:{
            type: DataTypes.BIGINT.UNSIGNED,  //sequelize otortga diccionario- tipo de dato- tiene que ser positivo, por eso el .unsigned
            primaryKey: true,
            autoIncrement: true,
        },
        firstname : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },
{ sequelize, modelName: "user",timestamps:false }
);*/



module.exports ={
    viewAdmin,
    viewArticle

};