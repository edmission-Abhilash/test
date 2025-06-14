const puppeteer = require('puppeteer');
const fs = require('fs');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


function generateFakeUser() {
  const names = ['Abhilash', 'Sumit', 'Dayyan', 'Rajan', 'Saurabh', 'Rahul', 'Pramod'];
  const countries = ['India', 'USA', 'Germany', 'Canada', 'Japan']; 
  const courses = ['Web Development', 'Data Science', 'AI & ML', 'Cybersecurity'];
  const genders = ['Male', 'Female'];

  const name = names[Math.floor(Math.random() * names.length)];
  const email = `${name.toLowerCase()}${Math.floor(Math.random() * 1000)}@test.com`;
  const phone = `98765${Math.floor(10000 + Math.random() * 90000)}`;
  const country = countries[Math.floor(Math.random() * countries.length)];
  const course = courses[Math.floor(Math.random() * courses.length)];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const message = "I would like to enquire more about the course.";

  return { name, email, phone, country, course, gender, message };
}

const HEADLESS = false;

runBot(15); 

async function runBot(times = 5) {
  const browser = await puppeteer.launch({ headless: HEADLESS });
  const page = await browser.newPage();
  const reportData = [["Name", "Email", "Phone", "Country", "Course", "Gender", "Status", "Error"]];

  for (let i = 0; i < times; i++) {
    const user = generateFakeUser();
    console.log(`Filling form for ${user.name}`);

    try {
      await page.goto('http://127.0.0.1:5500/enquiryform.html');

      await page.type('input[name="name"]', user.name);
      await page.type('input[name="email"]', user.email);
      await page.type('input[name="phone"]', user.phone);

      await page.select('select[name="country"]', user.country);
      await page.select('select[name="course"]', user.course);

      await page.click(`input[name="gender"][value="${user.gender}"]`);

      await page.type('textarea[name="message"]', user.message);

      await page.click('input[name="terms"]');

      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation()
      ]);

      reportData.push([user.name, user.email, user.phone, user.country, user.course, user.gender, "Success", ""]);

    } catch (err) {
      console.log(`❌ Failed for ${user.name}: ${err.message}`);
      reportData.push([user.name, user.email, user.phone, user.country, user.course, user.gender, "Failed", err.message]);
      await page.screenshot({ path: `error-${user.name}.png` });
    }

    await page.goBack();
    await sleep(500);
  }

  await browser.close();

  const csvContent = reportData.map(row => row.join(",")).join("\n");
  fs.writeFileSync("enquiry_report.csv", csvContent);
  console.log("✅ Report generated: enquiry_report.csv");
}
