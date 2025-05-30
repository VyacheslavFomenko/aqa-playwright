const { test, expect } = require("/fixtures/userGaragePage");

test("should add car", async ()=>{
    await userGaragePage.open();
    await userGaragePage.openAddCarModel();
    await userGaragePage.addCar({
        brand: 'Audi',
        model: 'TT',
        mileage: 1234,
    });

    await userGaragePage.submit();

    await userGaragePage.page.waitForSelector('text=Audi TT');
});