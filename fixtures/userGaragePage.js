const base = require('@playwright/test');
const { GaragePage } = require('../pages/garagePage');

/**
 * @typedef {import('@playwright/test').TestFixtures & {
 *   userGaragePage: import('../pages/garagePage').GaragePage
 * }} CustomFixtures
 *
 * @type {import('@playwright/test').TestType<CustomFixtures, {}>}
 */
const test = base.test.extend({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'storageStateUser.json' });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.goto();
        await use(garagePage);
        await context.close();
    },
});

module.exports = { test, expect: test.expect };
