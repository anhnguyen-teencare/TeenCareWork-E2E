import { test as base } from "@playwright/test";
import { DealListPage } from "../pages/crm/deal-list.page";
import { LoginPage } from "../pages/login.page";

interface Pages {
  loginPage: LoginPage;
  dealListPage: DealListPage;
}

/** Test mở rộng: inject sẵn Page Object qua fixture thay vì new thủ công trong từng test. */
export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dealListPage: async ({ page }, use) => {
    await use(new DealListPage(page));
  },
});

export { expect } from "@playwright/test";
