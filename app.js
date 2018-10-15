'use strict';

const SwaggerExpress = require('swagger-express-mw');
const swaggerTools = require('swagger-tools');
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const app = require('express')();
module.exports = app;

var config = {
  appRoot: __dirname
};

// Redireciona o arquivo que dever ser lido ao acessar a documentação da API via URL
const spec = fs.readFileSync(path.join(__dirname,'api/swagger/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

/**
 * Inicializa o middleware do swagger para exibir a documentação.
 */
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerUi());
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);

});
