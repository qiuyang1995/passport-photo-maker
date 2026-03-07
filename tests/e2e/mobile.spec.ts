import { expect, test } from "@playwright/test";

const SAMPLE_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABBAEAH9m2WQAAAABJRU5ErkJggg==",
  "base64",
);

test("mobile english tool supports upload and enables export", async ({ page }) => {
  await page.goto("/en/passport-photo-maker");
  await page.locator('input[type="file"]').setInputFiles({
    name: "passport-photo.png",
    mimeType: "image/png",
    buffer: SAMPLE_PNG,
  });

  await expect(page.getByTestId("tool-status")).toContainText(
    "Drag the photo to reposition it",
  );
  await expect(
    page.getByRole("button", { name: "Export digital JPG" }),
  ).toBeEnabled();
});
