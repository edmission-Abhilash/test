const puppeteer = require('puppeteer');
const fs = require('fs');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateFakeUser() {
    const names = ['Abhilash','Sumit','Dayyan','Rajan','Saurabh','Rahul','Pramod'];
    const name = names[Math.floor(Math.random() * names.length)];
    const email = `${name.toLowerCase()}${Math.floor(Math.random() * 1000)}@test.com`;
    return { name, email };
}

const HEADLESS = false;
runBot(5); 

async function runBot(times = 5) {
    const browser = await puppeteer.launch({ headless: HEADLESS });
    const page = await browser.newPage();
    const reportData = [["Name", "Email", "Status", "Error"]];

    for (let i = 0; i < times; i++) {
        const user = generateFakeUser();
        console.log(`Filling form for user: ${user.name} (${user.email})`);

        try {
            // Randomly simulate an error for some users
            if (Math.random() < 0.3) { // 
                throw new Error("Simulated form error");
            }

            await page.goto('http://127.0.0.1:5500/form.html');

            await page.type('input[name="name"]', user.name);
            await page.type('input[name="email"]', user.email);

            const submitButton = await page.$('button[type="submit"]');
            await submitButton.click();

            await page.waitForNavigation();

            reportData.push([user.name, user.email, "Success", ""]);
        } catch (err) {
            console.log(`❌ Failed to submit for ${user.name}: ${err.message}`);
            reportData.push([user.name, user.email, "Failed", err.message]);
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
