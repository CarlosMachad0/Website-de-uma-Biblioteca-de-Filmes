var Sequelize = require('sequelize');
var sequelize = require('./database');
var Genero = require('./generos');



var filmes = sequelize.define('filmes', {

    id:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    descrição:
    {
     type: Sequelize.STRING,
     allowNull: false,
    },
    título:
    {
     type: Sequelize.STRING,
     allowNull: false,
    },
    foto:
    {
     type: Sequelize.STRING,
     allowNull: false,
    },
    generoId:
    {
     type: Sequelize.INTEGER,   
     allowNull: false,
     references:
     {
         model: Genero,
         key:"id",
     },

    }
});

filmes.belongsTo(Genero);
module.exports = filmes;