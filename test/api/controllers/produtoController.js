var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('produtoController', function() {

    describe('GET /produtos', function() {
      
      it('Deve retornar a lista de produtos', function(done) {

        request(server)
          .get('/produtos')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(
              [
                {
                  produtoId: 1,
                  descricao: 'Coca-cola', 
                  preco: 5.5
                },
                {
                  produtoId: 2,
                  descricao: 'M&M', 
                  preco: 2
                }                
              ]
            );
            done();
          });
      });

    });    

    describe('GET /produto/{produtoId}',   function() {

      it('Deve retornar o produto especificado', function(done) {

        request(server)
          .get('/produtos/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({
              produtoId: 1,
              descricao: 'Coca-cola', 
              preco: 5.5
            });

            done();
          });
      });

    });

  });

});
