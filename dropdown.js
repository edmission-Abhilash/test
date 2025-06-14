const puppeteer = require('puppeteer');
const fs = require('fs');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateFakeUser() {
    const names = ['Abhilash', 'Sumit', 'Dayyan', 'Rajan', 'Saurabh', 'Rahul', 'Pramod'];
    const countries = ['India', 'USA', 'Germany', 'Canada', 'Japan'];

    const name = names[Math.floor(Math.random() * names.length)];
    const email = `${name.toLowerCase()}${Math.floor(Math.random() * 1000)}@test.com`;
    const country = countries[Math.floor(Math.random() * countries.length)];

    return { name, email, country };
}

const HEADLESS = false;
runBot(10); 

async function runBot(times = 5) {
    const browser = await puppeteer.launch({ headless: HEADLESS });
    const page = await browser.newPage();
    const reportData = [["Name", "Email", "Country", "Status", "Error"]];

    for (let i = 0; i < times; i++) {
        const user = generateFakeUser();
        console.log(`Filling form for ${user.name} (${user.email}) from ${user.country}`);

        try {
            await page.goto('http://127.0.0.1:5500/form.html');

            await page.type('input[name="name"]', user.name);
            await page.type('input[name="email"]', user.email);

            await page.select('select[name="country"]', user.country);

            const submitButton = await page.$('button[type="submit"]');
            await submitButton.click();

            await page.waitForNavigation();

            reportData.push([user.name, user.email, user.country, "Success", ""]);
        } catch (err) {
            console.log(`❌ Failed for ${user.name}: ${err.message}`);
            reportData.push([user.name, user.email, user.country, "Failed", err.message]);
            await page.screenshot({ path: `error-${user.name}.png` });
        }

        await page.goBack();
        await sleep(500);
    }

    await browser.close();

    const csvContent = reportData.map(row => row.join(",")).join("\n");
    fs.writeFileSync("report.csv", csvContent);
    console.log("✅ Report generated: report.csv");
}
