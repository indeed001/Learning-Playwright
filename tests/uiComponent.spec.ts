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

test("checkbox", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();
  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });
  const allBoxes = page.getByRole("checkbox");
  const allBoxesArray = await allBoxes.all();

  for (const boxes of allBoxesArray) {
    await boxes.check({ force: true });
    expect(boxes.isChecked()).toBeTruthy();
  }
});

test("list and dropdowns", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select .select-button");
  await dropDownMenu.click();

  page.getByRole("list"); //when the list has a UL tag
  page.getByRole("listitem"); //when the list has LI tag

  // const optionList = page.getByRole("list").locator("nb-option");
  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  await dropDownMenu.click();
  for (const [theme, color] of Object.entries(colors)) {
    await optionList.filter({ hasText: theme }).click();
    await expect(header).toHaveCSS("background-color", color);
    if (theme != "Corporate") await dropDownMenu.click();
  }
});

test("tooltip", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const toolTipCard = page
    .locator("nb-card")
    .filter({ hasText: "Tooltip Placements" });
  await toolTipCard.getByRole("button", { name: "TOP" }).hover();

  page.getByRole("tooltip"); //if you have a role tooltip created

  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("dialog", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //agar browser based dialog hai tou listner set krna padhta hai jo ki accept hota hai dialog open hone par
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();

  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //get row by any text in the row
  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();
  await targetRow.getByRole("textbox", { name: "Age" }).fill("25");
  await targetRow.locator(".nb-checkmark").click();

  //get the row based on the value in the specific column
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator(".nb-edit").click();
  // await targetRowById
  //   .getByRole("textbox", { name: "E-mail" })
  //   .fill("bhoju@gmail.com");
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("bhoju@gmail.com");
  await page.locator(".nb-checkmark").click();
  await expect(targetRowById.locator("td").nth(5)).toHaveText(
    "bhoju@gmail.com"
  );

  await page
    .locator("input-filter")
    .getByRole("textbox", { name: "Age" })
    .fill("20");

  await page.waitForTimeout(500);
  const rows = page.locator("tbody").getByRole("row");
  for (const row of await rows.all()) {
    const age = await row.locator("td").nth(6).textContent();
    console.log(age, "-Age");
    expect(age).toEqual("20");
  }
});
