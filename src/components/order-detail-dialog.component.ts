import type { Locator, Page } from "@playwright/test";
import { TEXT } from "../data/text";
import { BaseDialog } from "./base-dialog.component";

/** Dialog "Chi tiết đơn hàng" — mở từ nút sửa đơn trong tab Đơn hàng, dùng để thêm thanh toán. */
export class OrderDetailDialog extends BaseDialog {
  constructor(page: Page) {
    super(page, TEXT.orderDetailDialog.title);
  }

  /** Control của một ô field — label chỉ là text thường nên đi theo element kế tiếp. */
  private fieldControl(label: string | RegExp): Locator {
    return this.dialog
      .getByText(label, { exact: true })
      .locator("xpath=following-sibling::*[1]");
  }

  /** Số tiền còn lại phải thanh toán, đọc từ dòng "Còn lại:" của đơn. */
  async remainingAmount(): Promise<number> {
    const text = (await this.fieldControl(TEXT.orderDetailDialog.remainingLabel).textContent()) ?? "";
    return Number(text.replace(/\D/g, ""));
  }

  /** Thêm 1 dòng thanh toán đủ 100% số tiền còn lại, trạng thái Done. */
  async addFullPayment(paidDateIso: string): Promise<void> {
    const t = TEXT.orderDetailDialog;
    const amount = await this.remainingAmount();

    await this.dialog.getByRole("button", { name: t.addPaymentButton }).click();
    await this.fieldControl(t.amountLabel).fill(String(amount));
    await this.fieldControl(t.paidDateLabel).fill(paidDateIso);
    // Payment đã thanh toán bắt buộc có nội dung chuyển khoản
    await this.dialog.getByPlaceholder(t.transferContentPlaceholder).fill("E2E automation");
    await this.fieldControl(t.statusLabel).click();
    await this.selectPortalOption(t.statusDone);

    // Người thu tiền: chọn người đầu tiên trong danh sách (môi trường dev).
    // Ô tìm kiếm là combobox keyboard-first, item đầu được highlight sẵn —
    // chọn bằng Enter vì click chuột vào item không kích hoạt selection ổn định.
    const collectorTrigger = this.fieldControl(t.collectorLabel);
    await collectorTrigger.click();
    const search = this.page.getByPlaceholder(t.collectorSearchPlaceholder);
    const firstCollector = (await this.page.locator("[cmdk-item]").first().textContent()) ?? "";
    await search.press("Enter");
    // Trigger hiển thị người thu vừa chọn = lựa chọn đã ăn
    await collectorTrigger.filter({ hasText: firstCollector.trim() }).waitFor();
  }

  /** Lưu thanh toán; thông báo email gói có thể hiện sau khi lưu — đóng nếu có. */
  async saveAndDismissEmailNotice(): Promise<void> {
    await this.submitAndWaitClosed(TEXT.orderDetailDialog.saveButton);

    const notice = this.page.getByRole("alertdialog");
    const shown = await notice.waitFor({ state: "visible", timeout: 3000 }).then(
      () => true,
      () => false,
    );
    if (shown) {
      await notice
        .getByRole("button", { name: TEXT.orderDetailDialog.packageEmailConfirm })
        .click();
    }
  }
}
