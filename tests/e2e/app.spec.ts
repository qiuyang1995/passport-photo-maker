import { expect, test, type Page } from "@playwright/test";

const SAMPLE_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABBAEAH9m2WQAAAABJRU5ErkJggg==",
  "base64",
);

async function uploadSamplePhoto(page: Page) {
  await page.locator('input[type="file"]').setInputFiles({
    name: "passport-photo.png",
    mimeType: "image/png",
    buffer: SAMPLE_PNG,
  });
}

test("redirects bare root to localized homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("english homepage links into the tool and exports a digital jpg", async ({
  page,
}) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "Make my photo" }).click();
  await expect(page).toHaveURL(/\/en\/passport-photo-maker$/);

  await uploadSamplePhoto(page);
  await expect(page.getByTestId("tool-status")).toContainText(
    "Drag the photo to reposition it",
  );

  await page.locator('input[type="range"]').evaluate((element) => {
    const input = element as HTMLInputElement;
    input.value = "1.4";
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  const stage = page.getByTestId("photo-stage");
  const box = await stage.boundingBox();
  if (!box) {
    throw new Error("Stage bounding box is missing");
  }

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 20, box.y + box.height / 2 + 10);
  await page.mouse.up();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export digital JPG" }).click();
  const download = await downloadPromise;

  await expect(download.suggestedFilename()).toBe("passport-photo-digital.jpg");
});

test("content page CTA returns to the english tool", async ({ page }) => {
  await page.goto("/en/passport-photo-requirements-us");
  await page.getByRole("link", { name: "Open the tool" }).first().click();
  await expect(page).toHaveURL(/\/en\/passport-photo-maker$/);
});

test("chinese homepage can export the 4x6 print template", async ({ page }) => {
  await page.goto("/zh");
  await page.getByRole("link", { name: "开始制作照片" }).click();
  await expect(page).toHaveURL(/\/zh\/passport-photo-maker$/);

  await uploadSamplePhoto(page);
  await expect(page.getByTestId("tool-status")).toContainText("拖拽照片调整位置");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "导出 4x6 打印模板" }).click();
  const download = await downloadPromise;

  await expect(download.suggestedFilename()).toBe("passport-photo-print-4x6.jpg");
});
