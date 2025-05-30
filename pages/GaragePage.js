export class GaragePage {
    constructor(page) {
        this.page = page;
        this.addCarBtn = page.getByRole("button", {name: "Add car"});
        this.brandSelector = page.locator('select[name="carBrandId"]');
        this.modelSelector = page.locator('select[name="carModelId"]');
        this.mileageInput = page.locator('input[name="mileage"]');
        this.sbmtCar = page.getByRole("button", {name: "Add"});
    }

    async open() {
        await this.page.goto("/panel/garage");
    }

    async openAddCarModel() {
        await this.addCarBtn.click();
    }

    async addCar({brand, model, mileage}) {
        await this.brandSelector.selectOption({label: brand});
        await this.modelSelector.selectOption({label: model});
        await this.mileageInput.fill(mileage);
    }

    async submit(){
        await this.sbmtCar.click();
    }
}
