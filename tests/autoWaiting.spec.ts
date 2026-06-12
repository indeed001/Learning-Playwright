import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page
    .getByRole("button", { name: "Button Triggering AJAX Request" })
    .click();
  testInfo.setTimeout(testInfo.timeout * 3);
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  //   await successButton.click();
  //   const text = await successButton.textContent();
  //   await successButton.waitFor({ state: "attached" });
  //   const text = await successButton.allTextContents();
  //   expect(text).toContain("Data loaded with AJAX get request.");

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("Alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  //__wait for element
  //   await page.waitForSelector(".bg-success");

  //__wait for particular response
  //   await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  //__wait for network to be idle (NOT RECOMMENDED)
  await page.waitForLoadState("networkidle");

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
  //yeh multiple kar dega test timeout ko x3 times
  test.slow();

  // ==================== PLAYWRIGHT TIMEOUTS ====================
  //
  // 1. Test Timeout (Default: 30s)
  //    - Maximum time allowed for a test to complete.
  //
  // 2. Expect Timeout (Default: 5s)
  //    - Maximum time Playwright waits for an assertion to pass.
  //
  // 3. Action Timeout
  //    - Applies to actions like click(), fill(), check(), etc.
  //
  // 4. Navigation Timeout
  //    - Applies to page.goto(), waitForNavigation(), waitForURL(), etc.
  //
  // Global timeouts can be configured in playwright.config.ts,
  // and can be overridden at the test or action level.
  // =============================================================
});
