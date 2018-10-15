'use strict';

const produtoBO = require('../../business/produtoBO');

/**
 * Função que é chamada pelo swagger ao receber a requisição GET /produtos e 
 * retorna as informações de todos os produtos cadastrados.
 * @param {*} req Objeto de requisição recebido pelo swagger.
 * @param {*} res Objeto de resposta que deve ser enviado.
 */
module.exports.getProdutos = function (req, res) {
  produtoBO.findAll(res);
}

/**
 * Função que é chamada pelo swagger ao receber a requisição GET /produtos/{produtoId} 
 * e retorna as informações do produto solicitado.
 * @param {*} req Objeto de requisição recebido pelo swagger.
 * @param {*} res Objeto de resposta que deve ser enviado.
 */
module.exports.getProduto = function (req, res) {
  produtoBO.findById(req, res);
}