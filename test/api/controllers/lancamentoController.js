const should = require('should');
const request = require('supertest');
const server = require('../../../app.js');

describe('controllers', function() {
  
  describe('lancamentoController', function() {

    describe('GET /lancamentos/{cartaoId}', function() {
      
      it('Deve realizar lancamento do produto no cartão ', function(done) {

        request(server)
          .post('/lancamentos/1')
          .send(
            {
              "produtoId":1          
            }
          )          
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({
              cartaoId: 1,
              saldo: 0
            });
          done();
          });
      });

    });    
  
    describe('GET /lancamentos/{cartaoId}',   function() {
  
      it('Deve validar saldo disponível no cartão', function(done) {

        request(server)
          .post('/lancamentos/1')
          .send(
            {
              "produtoId":1          
            }
          )
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({
              message: "Saldo insuficiente"
            });

          done();
        });
      });
  
    });
  
  });
  
});