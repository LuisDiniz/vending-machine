'use strict';

const dbConnection = require('../util/dbConnection');
const Lancamento = require('../model/lancamento');


/**
 * Persiste o novo lançamento no banco de dados. 
 * @param {*} lancamento Objeto com as informações do lançamento.
 */
module.exports.save = async function (lancamento) {
    let sql = `INSERT INTO Lancamento (CartaoId, Descricao, Valor)
               VALUES (${lancamento.cartaoId}, '${lancamento.descricao}', ${lancamento.valor})` 
    await dbConnection.query(sql);
    return;
}

/**
 * Consulta se a carga automática já foi realizada hoje. 
 * @param {*} cartaoId Código do cartão que deve ser verificado se a 
 * carga automática já foi realizada.
 */
module.exports.verificarCargaRealizada = async function (cartaoId) {
    let cargaRealizada = false;
    let sql = `SELECT 1
                FROM Lancamento
                WHERE CartaoId = ${cartaoId}
                AND Valor > 0
                AND DAY(Data) = DAY(GETDATE())`
    let result = await dbConnection.query(sql);
    cargaRealizada = result.recordset.length > 0 ? true : false;
    return cargaRealizada;
}

/**
 * Consulta no banco de dados todos os lançamentos do cartão informado, ordenando
 * pelos lançamentos mais recentes. 
 * @param {*} cartaoId Código do cartão que os lançamentos devem ser consultados.
 */
module.exports.findByCartaoId = async function (cartaoId){
    let lancamentos = [];
    let sql = `SELECT 
                    Lancamento.LancamentoId,
                    Lancamento.CartaoId,
                    Lancamento.Descricao,
                    Lancamento.Valor,
                    Data = CONVERT(VARCHAR, Data, 103)
                FROM Lancamento
                WHERE CartaoId = ${cartaoId}
                ORDER BY Lancamento.Data DESC, Lancamento.LancamentoId DESC`
    let result = await dbConnection.query(sql);
    for (let record of result.recordset){
        let lancamento = new Lancamento();
        lancamento.lancamentoId = record.LancamentoId;
        lancamento.cartaoId = record.CartaoId;
        lancamento.descricao = record.Descricao;
        lancamento.valor = record.Valor;
        lancamento.data = record.Data;
        lancamentos.push(lancamento);
    }
    return lancamentos;
}