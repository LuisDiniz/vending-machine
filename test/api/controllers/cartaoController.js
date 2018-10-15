const test = require('tape')
const should = require('should');
const request = require('supertest');
const server = require('../../../app');

test('Realizar carga automática', (t) => {

    request(server)
      .get('/cartoes/saldo/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        t.assert(res.body.should.eql({
                                        "cartaoId": 1,
                                        "saldo":5.50
                                      }), "Carga automática realizada");
        t.end();
      })
});

test('Realizar apenas uma carga automática', (t) => {

  request(server)
    .get('/cartoes/saldo/1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      t.assert(res.body.should.eql({
                                      "cartaoId": 1,
                                      "saldo":5.50
                                    }), "Carga automática duplicada não foi realizada ");
      t.end();
      process.exit();
    })
});