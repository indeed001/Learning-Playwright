import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  //by tag name
  page.locator("input");

  //by Id
  page.locator("#inputEmail1");

  //by Class
  page.locator(".shape-rectangle");

  //by attribute
  page.locator('[placeholder="Email"]');

  //by text
  page.locator(':text("Forms")').click();

  //by exact text match
  page.locator(':text-is("Forms")').click();
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Jane Doe" }).click();
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByTitle("IoT Dashboard").click();
  await page.getByLabel("Email").first().click();
  await page.getByTestId("sign-in-button").click();
});

test("Locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();
  await page
    .locator("nb-card")
    .getByRole("button", { name: "SIGN IN" })
    .first()
    .click();
  //try to avoid indexes since order of the elements sometimes can be changes
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent element", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page
    .locator("nb-card", { has: page.locator("#inputEmail") })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();
  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();

  //not really a recommended method
  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing the locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  const passwordField = basicForm.getByRole("textbox", { name: "Password" });
  await emailField.fill("bhoj@gmail.com");
  await passwordField.fill("hello");
  await basicForm.getByRole("button", { name: "Submit" }).click();
  await expect(emailField).toHaveValue("bhoj@gmail.com");
});
