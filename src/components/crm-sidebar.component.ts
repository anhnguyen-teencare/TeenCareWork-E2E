import type { Locator, Page } from "@playwright/test";

/** Sidebar trái của module CRM — mỗi item menu là một button trong vùng aside. */
export class CrmSidebar {
  private readonly root: Locator;

  constructor(page: Page) {
    this.root = page.getByRole("complementary");
  }

  /** Item menu theo đúng label hiển thị, vd "Deal", "Đơn hàng". */
  item(label: string): Locator {
    return this.root.getByRole("button", { name: label, exact: true });
  }
}
