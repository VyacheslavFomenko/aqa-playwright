import {expect, test} from "@playwright/test";

test("should mock profile and verify data", async ({page}) => {
    await page.route("**/api/users/profile", async route => {
        const mockedData = {
            id: 1,
            firstName: "Tom",
            lastName: "Test",
            email: "test@test.com",
        }

        await route.fulfill({
            status: 200,
            contentType: "application/json",
            data: JSON.stringify(mockedData),
        });
    });
    await page.goto("https://qauto.forstudy.space/panel/profile");

    await expect(page.locator("p=profile_name.display-4")).toHaveText("Tom Test");
});
