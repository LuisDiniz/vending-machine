const test = require('tape')
const should = require('should');
const request = require('supertest');
const server = require('../../../app.js');

test('Realizar lancamento', (t) => {

    request(server)
      .post('/lancamentos/1')
      .send({
          "produtoId":1          
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        t.assert(res.body.should.eql({
                                        "cartaoId": 1,
                                        "saldo":0
                                      }), "Lançamento realizado");
        t.end();
      })
});

test('Validar saldo disponível', (t) => {

  request(server)
    .post('/lancamentos/1')
    .send({
        "produtoId":1          
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .end(function(err, res) {
      should.not.exist(err);
      t.assert(res.body.should.eql({
                                      "message": "Saldo insuficiente"
                                    }), "Saldo insuficiente. Não realizou laçamento");
      t.end();
      process.exit();
    })
});