const {chromium} = require("@playwright/test");

module.exports = async () => {
    const browser = await chromium.launch({});
    const page = await browser.newPage();

    await page.goto("/");
    await page.fill('input[name="username"]', process.env.USERNAME || 'guest');
    await page.fill('input[name="password"]', process.env.PASSWORD || 'welcome2qauto');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/panel/garage');
    await page.context().storageState({ path: 'storageStateUser.json' });
    await browser.close();
}
