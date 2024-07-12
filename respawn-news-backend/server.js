const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Configuração do rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP a cada 15 minutos
    message: "Você fez muitas solicitações. Tente novamente mais tarde."
});

// Aplicar o rate limiter a todas as rotas
app.use(limiter);

// Rota de teste
app.get('/', (req, res) => {
    res.send('Rate limiting ativo.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
