'use strict';

const produtoRepostiory = require('../repository/produtoRepository');
// Modelos
const Produto = require('../model/produto');

/**
 * Retorna as informações do produto informado.
 * @param {*} req Objeto de requisição recebido pelo swagger com o código
 * do produto que deve ser consultado.
 * @param {*} res Objeto de resposta com as informações do produto informado.
 */
module.exports.findById = async function (req, res){
    let produtoId = 0;
    let produto = new Produto();
    produtoId = req.swagger.params.produtoId.value;
    produto = await produtoRepostiory.findById(produtoId);
    return res.json(produto);
}

/**
 * Retorna as informações dos produtos cadastrados no banco de dados.
 * @param {*} res Objeto de resposta com as informações dos produtos.
 */
module.exports.findAll = async function (res){
    let produtos = [];
    produtos = await produtoRepostiory.findAll();
    return res.json(produtos);
}