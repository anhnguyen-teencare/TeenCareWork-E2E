import { TRAINING_PACKAGE_CODE, generateParent, generateStudent } from "../../src/data/factories";
import { TEXT } from "../../src/data/text";
import { expect, test } from "../../src/fixtures/test";

test.describe("CRM — Đơn hàng & thanh toán", () => {
  test("Thanh toán đủ đơn gói huấn luyện → deal lên L8.2 và sinh deal OB Upsell", async ({
    page,
    dealListPage,
    newDealDialog,
    dealDetailDialog,
    orderCreateDialog,
    orderDetailDialog,
    studentDialog,
  }) => {
    test.slow(); // journey dài: deal → đơn hàng → thanh toán → verify 2 deal

    const parent = generateParent();
    const student = generateStudent();

    // 1. Tạo deal New làm nền cho đơn hàng
    await dealListPage.goto();
    await dealListPage.addDealButton.click();
    await newDealDialog.createNewDeal(parent);

    // 2. Mở chi tiết deal vừa tạo → tab Đơn hàng
    await dealListPage.searchDeals(parent.phone);
    await dealListPage.openDealDetail(parent.phone);
    await dealDetailDialog.openOrdersTab();
    await dealDetailDialog.clickAddOrder();

    // 3. Thêm học sinh mới cho đơn
    await orderCreateDialog.openAddStudent();
    await studentDialog.createStudent(student);
    await expect(orderCreateDialog.customerName).toHaveValue(student.name);

    // 4. Chọn gói huấn luyện, nhập email PH, phương thức hoá đơn COD
    await orderCreateDialog.selectProduct(TRAINING_PACKAGE_CODE);
    await orderCreateDialog.fillEmail(parent.email);
    await orderCreateDialog.selectInvoiceMethod("COD");
    await orderCreateDialog.save();
    await expect(dealDetailDialog.orderCreatedButton).toBeVisible();

    // 5. Mở chi tiết đơn hàng, thêm thanh toán đủ 100% trạng thái Done
    await dealDetailDialog.openOrderDetail();
    await orderDetailDialog.addFullPayment(new Date().toISOString().slice(0, 10));
    await orderDetailDialog.saveAndDismissEmailNotice();
    await dealDetailDialog.close();

    // 6. Deal gốc lên L8.2 và deal OB Upsell được hệ thống tự sinh ở "L8 New" —
    //    upsell sinh phía backend nên reload + tìm lại cho tới khi thấy
    await expect(async () => {
      await dealListPage.goto();
      await dealListPage.searchDeals(parent.phone);
      const rows = dealListPage.dealRow(parent.phone);
      await expect(rows.filter({ hasText: TEXT.crmDealList.paidFullStage })).toBeVisible({
        timeout: 5_000,
      });
      await expect(rows.filter({ hasText: TEXT.crmDealList.upsellFirstStage })).toBeVisible({
        timeout: 5_000,
      });
    }).toPass({ timeout: 60_000 });
  });
});
