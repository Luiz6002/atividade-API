// docs/index.js
// Monta a documentação OpenAPI (Swagger UI) na aplicação Express.
// Uso no server.js:  require('./docs')(app);
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

module.exports = function setupDocs(app) {
  // Especificação OpenAPI bruta (JSON) - registrar ANTES de /docs
  app.get('/docs/api.json', (req, res) => res.json(swaggerSpec));

  // Interface interativa (botão "Authorize" incluso)
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'Livraria API - Docs',
      swaggerOptions: { persistAuthorization: true }, // mantém o token após F5
    })
  );
};
