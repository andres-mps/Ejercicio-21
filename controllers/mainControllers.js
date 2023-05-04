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


class User extends Model {};
User.init({
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
        }
    },
{ sequelize, modelName: "user"}
);

async function viewAdmin(req,res){
    const listado = await User.findAll();
    res.render("/admin", {listado});
};

async function viewArticle(req,res){
    res.render("/article");
};

module.exports ={
    viewAdmin,
    viewArticle

};