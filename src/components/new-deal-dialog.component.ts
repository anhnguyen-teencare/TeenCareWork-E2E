import type { Page } from "@playwright/test";
import type { ParentInput } from "../data/factories";
import { TEXT } from "../data/text";
import { BaseDialog } from "./base-dialog.component";

/** Dialog "Thông tin deal" — mở từ nút "Thêm deal mới", tab New là tab mặc định. */
export class NewDealDialog extends BaseDialog {
  constructor(page: Page) {
    super(page, TEXT.newDealDialog.title);
  }

  /** Điền thông tin PH ở tab New rồi lưu — chờ dialog đóng (đóng = tạo thành công). */
  async createNewDeal(parent: ParentInput): Promise<void> {
    const { newDealDialog: t } = TEXT;
    await this.dialog.getByPlaceholder(t.parentNamePlaceholder).fill(parent.name);
    await this.dialog.getByPlaceholder(t.phonePlaceholder).fill(parent.phone);
    await this.dialog.getByPlaceholder(t.emailPlaceholder, { exact: true }).fill(parent.email);
    await this.dialog.getByPlaceholder(t.gradePlaceholder).fill(parent.grade);
    await this.submitAndWaitClosed(t.saveButton);
  }
}
