import { test as base } from "@playwright/test";
import { DealDetailDialog } from "../components/deal-detail-dialog.component";
import { NewDealDialog } from "../components/new-deal-dialog.component";
import { OrderCreateDialog } from "../components/order-create-dialog.component";
import { OrderDetailDialog } from "../components/order-detail-dialog.component";
import { StudentDialog } from "../components/student-dialog.component";
import { DealListPage } from "../pages/crm/deal-list.page";
import { LoginPage } from "../pages/login.page";

interface Fixtures {
  loginPage: LoginPage;
  dealListPage: DealListPage;
  newDealDialog: NewDealDialog;
  dealDetailDialog: DealDetailDialog;
  orderCreateDialog: OrderCreateDialog;
  orderDetailDialog: OrderDetailDialog;
  studentDialog: StudentDialog;
}

/** Test mở rộng: inject sẵn Page/Component Object qua fixture thay vì new thủ công trong từng test. */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dealListPage: async ({ page }, use) => {
    await use(new DealListPage(page));
  },
  newDealDialog: async ({ page }, use) => {
    await use(new NewDealDialog(page));
  },
  dealDetailDialog: async ({ page }, use) => {
    await use(new DealDetailDialog(page));
  },
  orderCreateDialog: async ({ page }, use) => {
    await use(new OrderCreateDialog(page));
  },
  orderDetailDialog: async ({ page }, use) => {
    await use(new OrderDetailDialog(page));
  },
  studentDialog: async ({ page }, use) => {
    await use(new StudentDialog(page));
  },
});

export { expect } from "@playwright/test";
