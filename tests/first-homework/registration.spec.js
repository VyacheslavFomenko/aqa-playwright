import {expect, test} from "@playwright/test";
import {RegistrationPage} from "./registrationPage";

test.describe("Registration flow", ()=>{
    const prefix = 'aqa';
    const uniqueEmail = `${prefix}-${faker.internet.email()}`;
    const password = faker.internet.password();
    let registrationPage;
    test.beforeEach(async ({page})=>{
        registrationPage = new RegistrationPage(page);
        await registrationPage.open();
    });

    test('P1: valid registration', async () => {
        await registrationPage.fillNameInput(faker.string.alpha(20));
        await registrationPage.fillLastNameInput(faker.string.alpha(20));
        await registrationPage.fillEmailInput(uniqueEmail);
        await registrationPage.fillPasswordInput(password);
        await registrationPage.fillPasswordRepeatInput(password);
        await registrationPage.submit();

        await expect(registrationPage.page.locator('text=Registration successful')).toBeVisible();
    });

    test('N1: empty Name shows required error', async () => {
        await registrationPage.fillLastNameInput(faker.string.alpha(20));
        await registrationPage.fillEmailInput(uniqueEmail);
        await registrationPage.fillPasswordInput(password);
        await registrationPage.fillPasswordRepeatInput(password);
        await registrationPage.expectError('Name is required');
    });

    test('N2: invalid Name characters', async () => {
        await registrationPage.fillNameInput('J0hn!');
        await registrationPage.expectError('Name is invalid');
    });

    test('N3: malformed Email shows error', async () => {
        await registrationPage.fillNameInput(faker.string.alpha(20));
        await registrationPage.fillLastNameInput(faker.string.alpha(20));
        await registrationPage.fillEmailInput(`${prefix}-bad@test`);
        await registrationPage.expectError('Email is incorrect');
    });

    test('N4: empty Password shows required error', async () => {
        await registrationPage.fillNameInput(faker.string.alpha(20));
        await registrationPage.fillLastNameInput(faker.string.alpha(20));
        await registrationPage.fillEmailInput(uniqueEmail);
        await registrationPage.fillPasswordInput('');
        await registrationPage.expectError('Password required');
    });

    test('N5: short Password shows length error', async () => {
        await registrationPage.fillPasswordInput('short1');
        await registrationPage.expectError('Password has to be from 8 to 15 characters');
    });

    test('N6: passwords mismatch shows mismatch error', async () => {
        await registrationPage.fillPasswordInput('Password1');
        await registrationPage.fillPasswordRepeatInput('Password2');
        await registrationPage.expectError('Passwords do not match');
    });

    test('N7: empty Last name shows required error', async () => {
        await registrationPage.fillLastNameInput('');
        await registrationPage.expectError('Last name is required');
    });

    test('N8: Last name too long shows length error', async () => {
        await registrationPage.fillLastNameInput('A'.repeat(25));
        await registrationPage.expectError('Last name has to be from 2 to 20 characters long');
    });
});