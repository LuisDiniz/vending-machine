'use strict';

const lancamentoBO = require('../../business/lancamentoBO');

/**
 * Função que é chamada pelo swagger ao receber a requisição POST /lancamentos/{cartaoId} 
 * para registrar a compra de um produto no cartão informado.
 * @param {*} req Objeto de requisição recebido pelo swagger.
 * @param {*} res Objeto de resposta que deve ser enviado.
 */
module.exports.postLancamento = function (req, res) {
  lancamentoBO.save(req, res);
}

/**
 * Função que é chamada pelo swagger ao receber a requisição GET /lancamentos/{cartaoId} 
 * e retorna o histórico de lançamentos do cartão informado.
 * @param {*} req Objeto de requisição recebido pelo swagger.
 * @param {*} res Objeto de resposta que deve ser enviado.
 */
module.exports.getLancamentos = function (req, res){
  lancamentoBO.findByCartaoId(req, res);
}
