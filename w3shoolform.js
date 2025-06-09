const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.w3schools.com/howto/howto_css_contact_form.asp');

    await page.waitForSelector('input[name="firstname"]');
    await page.type('input[name="firstname"]', 'Abhi');
    await page.type('input[name="lastname"]', 'Test');
    // await page.waitForSelector('select[name="country"]');
    // await page.select('select[name="country"]', 'canada');
    await page.waitForSelector('textarea[class="test"]');
    await page.type('textarea[class="test"]', 'This is a test form submission using Puppeteer');
    await page.click('input[class="ws-btn w3-padding w3-round"]');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'w3schoolform.png' });
    await browser.close();
})();

