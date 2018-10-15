'use strict';

const cartaoBO = require('../../business/cartaoBO');

/**
 * Função que é chamada pelo swagger ao receber a requisição GET /cartoes/saldo/{cartaoId} 
 * para retornar o saldo atual do cartão informado.
 * @param {*} req Objeto de requisição recebido pelo swagger.
 * @param {*} res Objeto de resposta que deve ser enviado.
 */
module.exports.getSaldo = function (req, res) {
  cartaoBO.findById(req, res);
}
