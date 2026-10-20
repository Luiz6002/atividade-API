// docs/paths.js
// Endpoints documentados (anotações @openapi lidas pelo swagger-jsdoc).

/**
 * @openapi
 * /livros:
 *   get:
 *     tags: [Livros]
 *     summary: Lista todos os livros
 *     description: Rota pública. Retorna os livros com seus comentários.
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de livros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Livro' }
 *       500: { $ref: '#/components/responses/ErroInterno' }
 *   post:
 *     tags: [Livros]
 *     summary: Cadastra um livro (ADMIN)
 *     description: Exclusivo para perfil **ADMIN**.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LivroRequest' }
 *     responses:
 *       201:
 *         description: Livro criado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Livro' }
 *       400: { $ref: '#/components/responses/ErroValidacao' }
 *       401: { $ref: '#/components/responses/NaoAutenticado' }
 *       403: { $ref: '#/components/responses/Proibido' }
 *
 * /livros/{id}:
 *   get:
 *     tags: [Livros]
 *     summary: Busca um livro por ID
 *     description: Rota pública.
 *     security: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer }, example: 1 }
 *     responses:
 *       200:
 *         description: Livro encontrado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Livro' }
 *       404: { $ref: '#/components/responses/NaoEncontrado' }
 *
 * /livros/{id}/comentarios:
 *   post:
 *     tags: [Comentários]
 *     summary: Comenta um livro
 *     description: Requer autenticação (**USER** ou **ADMIN**). O nome do autor do comentário vem do token.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, description: ID do livro, schema: { type: integer }, example: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ComentarioRequest' }
 *     responses:
 *       201:
 *         description: Comentário criado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Comentario' }
 *       400: { $ref: '#/components/responses/ErroValidacao' }
 *       401: { $ref: '#/components/responses/NaoAutenticado' }
 *       404: { $ref: '#/components/responses/NaoEncontrado' }
 *
 * /autores:
 *   post:
 *     tags: [Autores]
 *     summary: Cadastra um autor (ADMIN)
 *     description: Exclusivo para perfil **ADMIN**.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AutorRequest' }
 *     responses:
 *       201:
 *         description: Autor criado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Autor' }
 *       400: { $ref: '#/components/responses/ErroValidacao' }
 *       401: { $ref: '#/components/responses/NaoAutenticado' }
 *       403: { $ref: '#/components/responses/Proibido' }
 *
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Cadastra um usuário
 *     description: Rota pública. Sempre cria perfil **USER**; qualquer `role` enviado é ignorado. Senha armazenada com BCrypt.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterRequest' }
 *     responses:
 *       201:
 *         description: Usuário criado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Usuario' }
 *       400: { $ref: '#/components/responses/ErroValidacao' }
 *       409: { $ref: '#/components/responses/Conflito' }
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Autentica e retorna um JWT
 *     description: Rota pública. Use o `token` no botão **Authorize**.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginRequest' }
 *     responses:
 *       200:
 *         description: Login realizado.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/LoginResponse' }
 *       400: { $ref: '#/components/responses/ErroValidacao' }
 *       401:
 *         description: Credenciais inválidas.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erro' }
 *             example: { erro: 'E-mail ou senha inválidos' }
 */
