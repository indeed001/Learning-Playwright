import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layout Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("inputs", async ({ page }) => {
    const usingTheGridlEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });
    await usingTheGridlEmailInput.fill("bhojraj@gmail.com");
    await usingTheGridlEmailInput.clear();
    await usingTheGridlEmailInput.pressSequentially("bhojraj@gmail.com", {
      delay: 500,
    });

    //generic assertion
    const inputValue = await usingTheGridlEmailInput.inputValue();
    expect(inputValue).toEqual("bhojraj@gmail.com");

    //locator assertion
    await expect(usingTheGridlEmailInput).toHaveValue("bhojraj@gmail.com");
  });
});
