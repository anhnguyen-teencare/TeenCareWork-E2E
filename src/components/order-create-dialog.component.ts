import type { Locator, Page } from "@playwright/test";
import { TEXT } from "../data/text";
import { BaseDialog } from "./base-dialog.component";

type InvoiceMethod = (typeof TEXT.orderDialog.invoiceMethods)[number];

/** Dialog "Tạo đơn hàng mới" — mở từ tab Đơn hàng trong chi tiết deal. */
export class OrderCreateDialog extends BaseDialog {
  /** Ô "Khách hàng" (readonly) — hiển thị tên học sinh sau khi thêm thành công */
  readonly customerName: Locator;

  constructor(page: Page) {
    super(page, TEXT.orderDialog.title);
    this.customerName = this.dialog.getByPlaceholder(TEXT.orderDialog.customerPlaceholder);
  }

  /** Mở dialog "Thêm học sinh mới" từ nút Thêm cạnh ô Khách hàng. */
  async openAddStudent(): Promise<void> {
    await this.dialog
      .getByRole("button", { name: TEXT.orderDialog.addStudentButton, exact: true })
      .click();
  }

  /** Mở dropdown sản phẩm, tìm theo mã rồi chọn dòng kết quả. */
  async selectProduct(productCode: string): Promise<void> {
    const { orderDialog: t } = TEXT;
    await this.dialog.getByRole("button", { name: t.productDropdown }).click();
    await this.dialog.getByPlaceholder(t.productSearchPlaceholder).fill(productCode);
    // Click vào cell mã SP (exact) — row cha chứa cả dropdown nên match trùng
    await this.dialog.getByRole("cell", { name: productCode, exact: true }).click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.dialog.getByPlaceholder(TEXT.orderDialog.emailPlaceholder).fill(email);
  }

  async selectInvoiceMethod(method: InvoiceMethod): Promise<void> {
    await this.dialog.getByText(TEXT.orderDialog.invoiceMethodPlaceholder).click();
    await this.selectPortalOption(method);
  }

  /** Lưu đơn — với COD dialog tự đóng khi tạo thành công. */
  async save(): Promise<void> {
    await this.submitAndWaitClosed(TEXT.orderDialog.saveButton);
  }
}
