import type { Page } from "@playwright/test";
import type { StudentInput } from "../data/factories";
import { TEXT } from "../data/text";
import { BaseDialog } from "./base-dialog.component";

/** Dialog "Thêm học sinh mới" — mở từ dialog tạo đơn hàng, tên PH/SĐT đã điền sẵn từ deal. */
export class StudentDialog extends BaseDialog {
  constructor(page: Page) {
    super(page, TEXT.studentDialog.title);
  }

  /** Điền vai trò PH + thông tin học sinh rồi lưu — chờ dialog đóng. */
  async createStudent(student: StudentInput): Promise<void> {
    const { studentDialog: t } = TEXT;
    await this.dialog.getByLabel(t.parentRoleLabel).click();
    await this.selectPortalOption(student.parentRole);
    await this.dialog.getByLabel(t.studentNameLabel).fill(student.name);
    await this.dialog.getByLabel(t.dateOfBirthLabel).fill(student.dateOfBirth);
    await this.submitAndWaitClosed(t.saveButton);
  }
}
