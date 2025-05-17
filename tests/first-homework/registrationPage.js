import {expect} from "@playwright/test";

export class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.locator("#signupName");
        this.lastNameInput = page.locator("#signupLastName");
        this.emailInput = page.locator("#signupEmail");
        this.passwordInput = page.locator("#signupPassword");
        this.repeatPasswordInput = page.locator("#signupRepeatPassword");
        this.registrationButton = page.locator('button:has-text("Register")');
    }

    async open() {
        await this.page.goto("https://qauto.forstudy.space/");
        await this.page.click(".hero-descriptor_btn.btn.btn-primary");
    }

    async fillNameInput(name) {
        await this.nameInput.clear();
        await this.nameInput.fill(name);
        await this.nameInput.blur();
    }

    async fillLastNameInput(lastName) {
        await this.lastNameInput.clear();
        await this.lastNameInput.fill(lastName);
        await this.lastNameInput.blur();
    }

    async fillEmailInput(email) {
        await this.emailInput.clear();
        await this.emailInput.fill(email);
        await this.emailInput.blur();
    }

    async fillPasswordInput(password) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
        await this.passwordInput.blur();
    }

    async fillPasswordRepeatInput(password) {
        await this.repeatPasswordInput.clear();
        await this.repeatPasswordInput.fill(password);
        await this.repeatPasswordInput.blur();
    }

    async submit() {
        await this.registrationButton.click();
    }

    async expectError(text) {
        await expect(this.page.locator(`text=${text}`)).toBeVisible();
    }
}