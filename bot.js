const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  
  await page.goto('http://127.0.0.1:5500/form.html');

  await page.type('#name', 'Abhi');
  await page.type('#email', 'abhi@example.com');
  await page.type('#phone', '9876543210');
  await page.type('#message', 'Testing form submission with Puppeteer!');

  await page.click('button[type="submit"]');
  await page.waitForSelector('#thankyou-message');
  await page.waitForTimeout(2000); 
 // await page.waitForNavigation()

  await page.screenshot({ path: 'custom-form-submitted.png' });

  await browser.close();
})();
