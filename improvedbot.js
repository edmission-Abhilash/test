const puppeteer = require('puppeteer');

async function runBot() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/form.html');

  await page.mouse.move(100, 100);
  await new Promise(r => setTimeout(r, 500));

  await page.type('input[name="name"]', 'Abhilash Vishwakarma', { delay: 150 });
  await page.type('input[name="email"]', 'abhi@example.com', { delay: 150 });
  await page.type('input[name="phone"]', '9876543210', { delay: 150 });
  await page.type('textarea[name="message"]', 'Testing form submission with Puppeteer!', { delay: 150 });

  await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));

  const submitButton = await page.$('button[type="submit"]');
  const btnBox = await submitButton.boundingBox();
  await page.mouse.move(btnBox.x + 5, btnBox.y + 5);
  await new Promise(r => setTimeout(r, 300));
  await submitButton.click();

  await page.waitForNavigation();
  await page.screenshot({ path: 'thankyou.png' });

  await browser.close();
}

runBot();
