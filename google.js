const pupeeteer = require('pupeeteer');
const { timeout } = require('puppeteer');

(async () => {
    const browser = await pupeeteer.launch({headless: true});
    const page = await brpwsser.newpage();
    await page.goto('https://www.google.com');

    try{
        await page.click('button[aria-label="Accept all"]',{timeout: 3000});
    } catch (err){
        console.log('No cookie popups');
    }

    await page.type('input[name="q"]' 'Puppeteer tutorial'),
    await page.keyboard.press('Enter');
    await page.waitForSelector('h3', {timeout:})
})