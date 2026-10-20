# Livraria API — Segurança com BCrypt, JWT e RBAC

## Requisitos
- Node.js 18+ recomendado
- VS Code

## Instalação e execução
No terminal do VS Code, dentro desta pasta:

```bash
npm install
npm start
```

Depois abra no navegador:

**http://localhost:3000/**

O frontend está dentro da própria API, então não é necessário Live Server.

## Credenciais iniciais

ADMIN
- E-mail: `admin@livraria.com`
- Senha: `admin123`

USER
- E-mail: `leitor@gmail.com`
- Senha: `leitor123`

Na primeira execução, os usuários iniciais são criados com hashes BCrypt (10 rounds). O arquivo `database.json` contém somente os hashes.

## Segurança implementada
- BCrypt para armazenamento de senhas.
- JWT stateless com expiração e issuer.
- Header `Authorization: Bearer <token>`.
- Middleware de autenticação.
- Middleware RBAC por `USER` e `ADMIN`.
- Cadastro público sempre cria `USER`, ignorando qualquer `role` enviado pelo cliente.
- `GET /api/v1/livros` e `GET /api/v1/livros/:id`: público.
- `POST /api/v1/auth/register`: público.
- `POST /api/v1/auth/login`: público.
- `POST /api/v1/livros/:id/comentarios`: USER ou ADMIN.
- `POST /api/v1/autores`: ADMIN.
- `POST /api/v1/livros`: ADMIN.

## Teste pelo VS Code
1. Abra esta pasta no VS Code.
2. Abra o terminal integrado: `Ctrl + Shift + ``.
3. Rode `npm install`.
4. Rode `npm start`.
5. Acesse `http://localhost:3000/`.

Não use `node index.html`. O HTML é servido automaticamente pelo Express.

## Documentação da API (OpenAPI 3.0 / Swagger UI)

Com a API rodando, acesse:

- **Interface interativa:** http://localhost:3000/docs
- **Especificação OpenAPI (JSON):** http://localhost:3000/docs/api.json

### Como testar rotas protegidas no Swagger
1. Em `POST /auth/login`, clique em **Try it out** e faça login (ex.: `admin@livraria.com` / `admin123`).
2. Copie o valor de `token` da resposta.
3. Clique em **Authorize**, cole apenas o token (o prefixo `Bearer` é adicionado automaticamente) e confirme.
4. As rotas com cadeado passam a enviar `Authorization: Bearer <token>`.

### Estrutura da documentação
- `docs/swagger.js`: definição base, esquema de segurança Bearer JWT, schemas e respostas de erro reutilizáveis.
- `docs/paths.js`: anotações `@openapi` de cada endpoint.
- `docs/index.js`: monta `/docs` e `/docs/api.json` no Express.

Dependências: `swagger-jsdoc` e `swagger-ui-express`.
