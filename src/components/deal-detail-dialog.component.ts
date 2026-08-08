import type { Locator, Page } from "@playwright/test";
import { TEXT } from "../data/text";
import { BaseDialog } from "./base-dialog.component";

/**
 * Dialog chi tiết deal — mở khi bấm xem một deal trong danh sách.
 * Title của dialog là tên deal (động) nên định vị bằng role dialog;
 * chỉ dùng các locator này khi không có dialog nào khác chồng lên.
 */
export class DealDetailDialog extends BaseDialog {
  /** Nút hiển thị thay cho "Thêm mới" khi deal đã có đơn hàng */
  readonly orderCreatedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.orderCreatedButton = this.dialog.getByRole("button", {
      name: TEXT.dealDetail.orderCreatedButton,
    });
  }

  async openOrdersTab(): Promise<void> {
    await this.dialog
      .getByRole("button", { name: TEXT.dealDetail.ordersTab, exact: true })
      .click();
  }

  async clickAddOrder(): Promise<void> {
    await this.dialog
      .getByRole("button", { name: TEXT.dealDetail.addOrderButton, exact: true })
      .click();
  }

  /** Mở "Chi tiết đơn hàng" — nút sửa đơn là icon-only nên bám theo icon bút, loại nút "Sửa" thông tin KH. */
  async openOrderDetail(): Promise<void> {
    await this.dialog
      .locator("button:has(svg.lucide-pen)")
      .filter({ hasNotText: "Sửa" })
      .click();
  }

  async close(): Promise<void> {
    await this.dialog
      .getByRole("button", { name: TEXT.dealDetail.closeButton, exact: true })
      .click();
  }
}
