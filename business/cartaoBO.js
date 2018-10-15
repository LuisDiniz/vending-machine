'use strict';

const cartaoRepository = require('../repository/cartaoRepository');
const lancamentoRepository = require('../repository/lancamentoRepository');
// Modelos
const Cartao = require('../model/cartao');
const Lancamento = require('../model/lancamento');
// Constantes 
const VALOR_CARGA_DIARIA = 5.50;
const DESCRICAO_CARGA_DIARIA = "Carga automática"

/**
 * Retorna o saldo atual do cartão informado além de realizar a 
 * carga automática diária no cartão.
 * @param {*} req Objeto de requisição recebido pelo swagger.
 * @param {*} res Objeto de resposta que deve ser enviado.
 */
module.exports.findById = async function (req, res){
    let cartaoId = 0;
    let cartao = new Cartao();
    let cargaRealizada = false;
    cartaoId = req.swagger.params.cartaoId.value;
    // Realiza carga automática do cartão diariamente
    cargaRealizada = await lancamentoRepository.verificarCargaRealizada(cartaoId);
    if (!cargaRealizada){
        // Cria um novo lançamento para relizar a carga no cartão 
        let lancamento = new Lancamento();
        lancamento.cartaoId = cartaoId;
        lancamento.descricao = DESCRICAO_CARGA_DIARIA;
        lancamento.valor = VALOR_CARGA_DIARIA;
        // Persiste as informações no banco
        await lancamentoRepository.save(lancamento);
        await cartaoRepository.cargaAutomatica(cartaoId, VALOR_CARGA_DIARIA);
    }
    cartao = await cartaoRepository.findById(cartaoId);
    return res.json(cartao);
}