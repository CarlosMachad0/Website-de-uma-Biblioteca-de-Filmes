var Sequelize = require('sequelize');
var sequelize = require('./database');
var filmes=require('./filmes');
var Generos = sequelize.define('genero',
    {
        genero: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    });

module.exports = Generos;