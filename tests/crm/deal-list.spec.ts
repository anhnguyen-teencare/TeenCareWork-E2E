import { TEXT } from "../../src/data/text";
import { expect, test } from "../../src/fixtures/test";

test.describe("CRM — Danh sách deal", () => {
  test.beforeEach(async ({ dealListPage }) => {
    await dealListPage.goto();
  });

  test("Hiển thị heading, tổng số deal và nút thêm deal", async ({ dealListPage }) => {
    await expect(dealListPage.heading("vi")).toBeVisible();
    await expect(dealListPage.dealCount).toBeVisible();
    await expect(dealListPage.addDealButton).toBeVisible();
  });

  test("Kanban render cột lead mới đầu tiên", async ({ dealListPage }) => {
    // Session mới luôn mở ở table view — phải chuyển sang kanban trước
    await dealListPage.switchToKanbanView();

    await expect(dealListPage.firstKanbanColumn).toBeVisible();
  });

  test("Sidebar hiển thị các mục chính và điều hướng được tab Deal", async ({
    page,
    dealListPage,
  }) => {
    const { sidebar } = dealListPage;

    await expect(sidebar.item(TEXT.crmSidebar.dashboard)).toBeVisible();
    await expect(sidebar.item(TEXT.crmSidebar.deal)).toBeVisible();
    await expect(sidebar.item(TEXT.crmSidebar.order)).toBeVisible();

    await sidebar.item(TEXT.crmSidebar.deal).click();

    await expect(page).toHaveURL(/\/crm\/deal/);
    await expect(dealListPage.heading("vi")).toBeVisible();
  });

  test("Chuyển ngôn ngữ deal sang EN đổi heading, chuyển lại VI khôi phục", async ({
    dealListPage,
  }) => {
    await dealListPage.switchLocale("en");
    await expect(dealListPage.heading("en")).toBeVisible();

    await dealListPage.switchLocale("vi");
    await expect(dealListPage.heading("vi")).toBeVisible();
  });
});
