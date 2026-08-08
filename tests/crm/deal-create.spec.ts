import { generateParent } from "../../src/data/factories";
import { TEXT } from "../../src/data/text";
import { expect, test } from "../../src/fixtures/test";

test.describe("CRM — Tạo deal", () => {
  test("Tạo deal New với PH mới → deal xuất hiện ở trạng thái L1.1 - Số mới", async ({
    dealListPage,
    newDealDialog,
  }) => {
    const parent = generateParent();

    await dealListPage.goto();
    await dealListPage.addDealButton.click();
    await newDealDialog.createNewDeal(parent);

    // Tìm lại theo SĐT — deal phải hiện đúng tên PH và ở trạng thái đầu tiên
    await dealListPage.searchDeals(parent.phone);
    const row = dealListPage.dealRow(parent.phone);
    await expect(row).toBeVisible();
    await expect(row).toContainText(parent.name);
    await expect(row).toContainText(TEXT.crmDealList.newDealStage);
  });
});
