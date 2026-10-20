require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Frontend de teste: ao acessar http://localhost:3000/ o HTML abre automaticamente.
app.use(express.static(path.join(__dirname, 'public')));

// Documentação OpenAPI (Swagger UI em /docs, JSON bruto em /docs/api.json)
require('./docs')(app);

app.get('/api/v1', (req, res) => {
  res.status(200).json({ mensagem: 'Livraria API online.' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/livros', livroRoutes);
app.use('/api/v1/autores', autorRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\nLivraria API rodando em http://localhost:${PORT}`);
  console.log(`Frontend disponível em http://localhost:${PORT}/`);
  console.log('ADMIN: admin@livraria.com / admin123');
  console.log('USER : leitor@gmail.com / leitor123\n');
});
