import { expect, test as setup } from "@playwright/test";
import { ADMIN_STORAGE_STATE, adminCredentials } from "../src/config/env";
import { LoginPage } from "../src/pages/login.page";

/**
 * Đăng nhập admin 1 lần qua UI rồi lưu storage state —
 * project khai báo dependencies: ["setup"] tái dùng session này, không login lại từng test.
 */
setup("đăng nhập admin và lưu storage state", async ({ page }) => {
  const { email, password } = adminCredentials();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.signIn(email, password);

  // Rời /login = profile đã load và app đã redirect về trang chủ theo role
  await expect(page).not.toHaveURL(/\/login/, { timeout: 20_000 });

  await page.context().storageState({ path: ADMIN_STORAGE_STATE });
});
