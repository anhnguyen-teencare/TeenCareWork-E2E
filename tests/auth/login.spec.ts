import { adminCredentials } from "../../src/config/env";
import { expect, test } from "../../src/fixtures/test";

test.describe("Đăng nhập", () => {
  test("Chưa đăng nhập thì truy cập /crm bị chuyển hướng về /login", async ({
    page,
    loginPage,
  }) => {
    await page.goto("/crm");

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.heading).toBeVisible();
  });

  test("Sai thông tin đăng nhập thì hiện lỗi và ở lại /login", async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.signIn("e2e-khong-ton-tai@example.com", "sai-mat-khau");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("Admin đăng nhập thành công được chuyển khỏi /login", async ({ page, loginPage }) => {
    const { email, password } = adminCredentials();

    await loginPage.goto();
    await loginPage.signIn(email, password);

    await expect(page).not.toHaveURL(/\/login/, { timeout: 20_000 });
  });
});
