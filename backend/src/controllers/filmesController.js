var Sequelize = require('sequelize');
var sequelize = require('../model/database');
var filmes = require('../model/filmes')
var Genero = require('../model/generos');
sequelize.sync()
const controllers = {}



controllers.AdicionaGenero = async (req, res) => {
    const response = await sequelize.sync().then(function () {
        Genero.create({
            genero: "Comédia",
      });
    });
  };


  controllers.GetGen=async(req,res)=>
  {
    const data = await Genero.findAll({
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
  };


controllers.list = async (req, res) => {
    const data = await filmes.findAll({
        include: [Genero],
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.create = async (req, res) => {

    const { descrição, título, foto, generoId } = req.body;

    const data = await filmes.create({
        descrição: descrição,
        título: título,
        foto: foto,
        generoId: generoId,
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        })
    // return res
    res.status(200).json({
        success: true,
        message: "Registado",
        data: data
    });
}

controllers.get = async (req, res) => {
    const { id } = req.params;
    const data = await filmes.findAll({
        where: { id: id },
        include: [Genero],
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { descrição, título, foto, generoId } = req.body;
    // Update data
    const data = await filmes.update({
        descrição: descrição,
        título: título,
        foto: foto,
        generoId: generoId,
    },
        {
            where: { id: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Updated successful" });
}
controllers.delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await filmes.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Deleted successful" });
}



module.exports = controllers;












