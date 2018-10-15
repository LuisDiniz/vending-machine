'use strict';

/**
 * Remove máscara da moeda "Real" e formata para inserir no banco de dados. 
 * @param {*} valor String com o valor a ser formatado.
 */
exports.formatReal = (valor) => {
    // Remove aspas simples e aspas duplas
    valor = valor.replace(/[']|["]/g,'');
    // Remove máscara do Real
    valor = valor.replace(/(R\$)/,'');
    // Remove espaços em brancho
    valor = valor.replace(/\s/g,'');
    // Remover '.'
    valor = valor.replace(/[.]/g,'');
    // Troca ',' por '.'
    valor = valor.replace(/[,]/,'.');

    let valorFormatado = + parseFloat(valor).toFixed(2);
    
    return valorFormatado;
}

/**
 * Remove aspas simples do texto informado.
 * @param {*} texto String que deve ser formatada.
 */
exports.removerAspasSimples = (texto) => {
    return texto.replace(/[']/g, '');
}

/**
 * Remover os espaços antes e depois do texto informado.
 * @param {*} texto String que deve ser formatada.
 */
exports.trim = (texto) => {
    return texto.replace(/^\s+|\s+$/g,"");
}