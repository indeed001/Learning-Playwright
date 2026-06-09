import { test } from "@playwright/test";

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



