'use strict';
// Repositories
const lancamentoRepository = require('../repository/lancamentoRepository');
const cartaoRepository = require('../repository/cartaoRepository');
const produtoRepository = require('../repository/produtoRepository');
// Modelos
const Cartao = require('../model/cartao');
const Lancamento = require('../model/lancamento');
const Produto = require('../model/produto');

/**
 * Insere um novo lançamento no cartão informado e atualiza o saldo do cartão. 
 * @param {*} req Objeto de requisição recebido pelo swagger com o código do cartão e
 * o lançamento a ser feito no mesmo.
 * @param {*} res Objeto de resposta que retorna o saldo cartão depois do lançamento.
 */
module.exports.save = async function (req, res){
    let cartaoId = 0;
    let lancamentoRequest = {};
    let produto = new Produto();
    let cartao = new Cartao();
    // Recupera os parâmetros informados
    cartaoId = req.swagger.params.cartaoId.value;
    lancamentoRequest = req.swagger.params.body.value;    
    produto = await produtoRepository.findById(lancamentoRequest.produtoId);
    cartao = await cartaoRepository.findById(cartaoId);
    // Validar se existe saldo suficiente no cartão
    if (cartao.saldo >= produto.preco){
        cartao.saldo = cartao.saldo - produto.preco; 
        // Cria um novo lançamento para relizar a carga no cartão 
        let lancamento = new Lancamento();
        lancamento.cartaoId = cartaoId;
        lancamento.descricao = produto.descricao;
        lancamento.valor = -produto.preco;
        // Persiste as informações no banco
        await lancamentoRepository.save(lancamento);
        await cartaoRepository.atualizarSaldo(lancamento.cartaoId, lancamento.valor);
        return res.json(cartao);
    }
    else {
        // Criar retorno de erro para saldo insuficiente
        let erro = {            
            "message": "Saldo insuficiente"
        };
        return res.status(400).json(erro);
    }
}

/**
 * Retorna os lançamentos do cartão informado, ordenando pelos lançamentos mais recentes. 
 * @param {*} req Objeto de requisição recebido pelo swagger que contém o código do cartão.
 * @param {*} res Objeto de resposta que retorna os lançamentos do cartão.
 */
module.exports.findByCartaoId = async function (req, res) {
    let cartaoId = 0;
    let lancamentos = [];
    cartaoId = req.swagger.params.cartaoId.value;
    lancamentos = await lancamentoRepository.findByCartaoId(cartaoId);
    return res.json(lancamentos);
}