'use strict';

const dbConnection = require('../util/dbConnection');
const Cartao = require('../model/cartao');

/**
 * Consulta no banco de dados as informações do cartão informado.
 * @param {*} cartaoId Código do cartão que as informações devem ser consultadas. 
 */
module.exports.findById = async function (cartaoId) {
    let cartao = new Cartao();
    let sql = `SELECT *
                FROM Cartao
                WHERE Cartao.CartaoId = ${cartaoId}`;
    let result = await dbConnection.query(sql);
    if (result.recordset.length > 0) {
        cartao.cartaoId = result.recordset[0].CartaoId;
        cartao.saldo = result.recordset[0].Saldo;
    }    
    return cartao;
}

/**
 * Atualiza o saldo do cartão com valor da carga automática diária.
 * @param {*} cartaoId Código do cartão que o saldo deve ser atualizado.
 * @param {*} saldo Valor da carga automática que deve ser realizada no cartão.
 */
module.exports.cargaAutomatica = async function (cartaoId, saldo) {
    let sql = `UPDATE Cartao 
               SET Saldo = ${saldo}
               WHERE CartaoId = ${cartaoId}`
    await dbConnection.query(sql);
    return;
}

/**
 * Atualiza o saldo do cartão de acordo com o valor do lançamento.
 * @param {*} cartaoId Código do cartão que o saldo deve ser atualizado.
 * @param {*} valorLancamento Valor do lançamento que deve ser subtraído ou 
 * adicionado ao saldo do cartão. 
 */
module.exports.atualizarSaldo = async function (cartaoId, valorLancamento) {
    let sql = `UPDATE Cartao 
               SET Saldo = Saldo + ${valorLancamento}
               WHERE CartaoId = ${cartaoId}`
    await dbConnection.query(sql);
    return;
}