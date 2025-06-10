const puppeteer = require('puppeteer');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateFakeUser() {
    const names = ['Abhilash','Sumit','Dayyan','Rajan','Saurabh','Rahul','Pramod'];
    const name = names[Math.floor(Math.random()* names.length)];
    const email = `${name.toLowerCase()}${Math.floor(Math.random() *1000)}@test.com`;
    return {name, email};

}


const HEADLESS = false;


runBot(3);

async function runBot(times = 5) {
    const browser = await puppeteer.launch({ headless: HEADLESS });
    const page = await browser.newPage();

    for (let i=0; i<times; i++) {
        const user = generateFakeUser();

        console.log(`Filling form for user: ${user.name} (${user.email})`)
        await page.goto('http://127.0.0.1:5500/form.html');

        await page.type('input[name="name" ]', user.name);
        await page.type('input[name="email"]', user.email);

        const submitButton = await page.$('button[type="submit"]');
        await submitButton.click();

        await page.waitForNavigation();
        //await page.screenshot({ path : `form-submitted-${user.name}.png` });

        await page.goBack();
    }
    await browser.close();
}