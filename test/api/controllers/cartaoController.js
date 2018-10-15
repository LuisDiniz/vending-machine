const should = require('should');
const request = require('supertest');
const server = require('../../../app');


describe('controllers', function() {
  
  describe('cartaoController', function() {

    describe('GET /cartoes/saldo/{cartaoId}', function() {
      
      it('Deve realizar a carga automática e retornar o saldo do cartão', function(done) {

        request(server)
          .get('/cartoes/saldo/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({
              cartaoId: 1,
              saldo: 5.50
            });
          done();
          });
      });

    });    
  
    describe('GET /produto/{produtoId}',   function() {
  
      it('Só deve realizar a carga automática uma vez e retornar o saldo do cartão', function(done) {

        request(server)
          .get('/cartoes/saldo/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({
              cartaoId: 1,
              saldo:5.50
            });

          done();
        });
      });
  
    });
  
  });
  
});