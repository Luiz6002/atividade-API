// docs/swagger.js
// Definição base da OpenAPI 3.0: info, segurança (Bearer JWT), schemas e respostas reutilizáveis.
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const erro = (exemplo) => ({
  'application/json': {
    schema: { $ref: '#/components/schemas/Erro' },
    example: { erro: exemplo },
  },
});

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Livraria API',
      version: '1.0.0',
      description:
        'API de livros, autores e comentários com BCrypt, JWT e RBAC (USER / ADMIN).\n\n' +
        '**Como testar rotas protegidas:**\n' +
        '1. Em `POST /auth/login`, use *Try it out* (ex.: `admin@livraria.com` / `admin123`).\n' +
        '2. Copie o `token` da resposta.\n' +
        '3. Clique em **Authorize**, cole só o token (o prefixo `Bearer` é adicionado automaticamente) e confirme.\n' +
        '4. As rotas com cadeado passam a enviar `Authorization: Bearer <token>`.',
    },
    servers: [{ url: '/api/v1', description: 'Servidor atual' }],
    tags: [
      { name: 'Auth', description: 'Cadastro e login (públicas)' },
      { name: 'Livros', description: 'Consulta pública e cadastro (ADMIN)' },
      { name: 'Autores', description: 'Cadastro de autores (ADMIN)' },
      { name: 'Comentários', description: 'Comentários em livros (USER ou ADMIN)' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido em POST /auth/login.',
        },
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', example: 'Maria Souza' },
            email: { type: 'string', format: 'email', example: 'maria@gmail.com' },
            senha: { type: 'string', format: 'password', example: 'maria123' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@livraria.com' },
            senha: { type: 'string', format: 'password', example: 'admin123' },
          },
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 3 },
            nome: { type: 'string', example: 'Maria Souza' },
            email: { type: 'string', example: 'maria@gmail.com' },
            role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'USER' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            usuario: { $ref: '#/components/schemas/Usuario' },
          },
        },
        AutorRequest: {
          type: 'object',
          required: ['nome'],
          properties: {
            nome: { type: 'string', example: 'Clarice Lispector' },
            nacionalidade: { type: 'string', example: 'Brasileira' },
          },
        },
        Autor: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 2 },
            nome: { type: 'string', example: 'Clarice Lispector' },
            nacionalidade: { type: 'string', example: 'Brasileira' },
          },
        },
        LivroRequest: {
          type: 'object',
          required: ['titulo', 'ano', 'autor_id'],
          properties: {
            titulo: { type: 'string', example: 'Memórias Póstumas de Brás Cubas' },
            ano: { type: 'integer', example: 1881 },
            autor_id: { type: 'integer', example: 1 },
          },
        },
        Comentario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            autor_nome: { type: 'string', example: 'Leitor' },
            texto: { type: 'string', example: 'Clássico indispensável.' },
          },
        },
        Livro: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Dom Casmurro' },
            ano: { type: 'integer', example: 1899 },
            autor_id: { type: 'integer', example: 1 },
            comentarios: { type: 'array', items: { $ref: '#/components/schemas/Comentario' } },
          },
        },
        ComentarioRequest: {
          type: 'object',
          required: ['texto'],
          properties: {
            texto: { type: 'string', example: 'Leitura obrigatória!' },
          },
        },
        Erro: {
          type: 'object',
          properties: { erro: { type: 'string', example: 'Descrição do erro' } },
        },
      },
      responses: {
        ErroValidacao: { description: 'Dados inválidos ou campos obrigatórios ausentes.', content: erro('Campos obrigatórios não informados') },
        NaoAutenticado: { description: 'Token ausente, expirado ou corrompido.', content: erro('Token inválido ou expirado') },
        Proibido: { description: 'Perfil sem permissão (exige ADMIN).', content: erro('Acesso negado: requer perfil ADMIN') },
        NaoEncontrado: { description: 'Recurso não encontrado.', content: erro('Livro não encontrado') },
        Conflito: { description: 'E-mail já cadastrado.', content: erro('E-mail já cadastrado') },
        ErroInterno: { description: 'Erro interno do servidor.', content: erro('Erro interno do servidor') },
      },
    },
  },
  apis: [path.join(__dirname, 'paths.js')],
});
