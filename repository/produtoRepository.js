'use strict';

const dbConnection = require('../util/dbConnection');
const Produto = require('../model/produto');

/**
 * Consulta no banco de dados as informações do produto informado.
 * @param {*} produtoId Código do produto que as informações devem ser consultadas.
 */
module.exports.findById = async function (produtoId) {
    let produto = new Produto();
    let sql = `SELECT *
                FROM Produto
                WHERE Produto.ProdutoId = ${produtoId}`;
    let result = await dbConnection.query(sql);
    if (result.recordset.length > 0) {
        produto.produtoId = result.recordset[0].ProdutoId;
        produto.preco = result.recordset[0].Preco;
        produto.descricao = result.recordset[0].Descricao;
    }    
    return produto;
}

/**
 * Consulta no banco de dados as informações de todos os produtos cadastrados no banco de dados.
 */
module.exports.findAll = async function () {
    let produtos = [];
    let sql = `SELECT *
                FROM Produto`;
    let result = await dbConnection.query(sql);
    for (let record of result.recordset) {
        let produto = new Produto();
        produto.produtoId = record.ProdutoId;
        produto.preco = record.Preco;
        produto.descricao = record.Descricao;
        produtos.push(produto);
    }    
    return produtos;
}