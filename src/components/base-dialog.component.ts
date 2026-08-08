import type { Locator, Page } from "@playwright/test";

/** Base cho các dialog: root định vị theo title (bỏ trống khi title động) + thao tác chung. */
export abstract class BaseDialog {
  protected readonly dialog: Locator;

  constructor(
    protected readonly page: Page,
    title?: string,
  ) {
    this.dialog = title ? page.getByRole("dialog", { name: title }) : page.getByRole("dialog");
  }

  /** Chọn option của select — option render trong portal ngoài dialog nên tìm ở mức page. */
  protected async selectPortalOption(name: string): Promise<void> {
    await this.page.getByRole("option", { name, exact: true }).click();
  }

  /** Click nút submit rồi chờ dialog đóng — dialog đóng nghĩa là thao tác thành công. */
  protected async submitAndWaitClosed(buttonName: string): Promise<void> {
    await this.dialog.getByRole("button", { name: buttonName, exact: true }).click();
    await this.dialog.waitFor({ state: "hidden" });
  }
}
