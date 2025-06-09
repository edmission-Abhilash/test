const puppeteer = require('puppeteer');
async function run(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://yahoo.com");
    const title = await page.title();
    const heading = await page.$('h1', (element) => element.textContent); 
    await page.screenshot({path: 'part3.png'});
    await page.pdf({path: 'part3.pdf', format: 'A4'});
    await browser.close();


}
run();
    
