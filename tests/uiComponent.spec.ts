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

  test("radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    // await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeFalsy();
  });
});
