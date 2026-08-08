import type { Locator, Page } from "@playwright/test";
import { CrmSidebar } from "../../components/crm-sidebar.component";
import { TEXT } from "../../data/text";
import { BasePage } from "../base.page";

export type DealLocale = "vi" | "en";

/** Trang Danh sách deal (/crm endpoint. */
export class DealListPage extends BasePage {
  protected readonly path = "/crm";

  readonly sidebar: CrmSidebar;
  readonly dealCount: Locator;
  readonly addDealButton: Locator;
  readonly firstKanbanColumn: Locator;
  private readonly localeToggle: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = new CrmSidebar(page);
    this.dealCount = page.getByText(TEXT.crmDealList.dealCount);
    this.addDealButton = page.getByRole("button", { name: TEXT.crmDealList.addDealButton });
    this.firstKanbanColumn = page.getByText(TEXT.crmDealList.firstKanbanColumn, { exact: true });
    this.localeToggle = page.getByLabel(TEXT.crmDealList.localeToggleLabel);
  }

  /** Heading đổi theo ngôn ngữ deal đang chọn nên nhận locale thay vì cố định. */
  heading(locale: DealLocale): Locator {
    return this.page.getByRole("heading", { name: TEXT.crmDealList.heading[locale] });
  }

  async switchLocale(locale: DealLocale): Promise<void> {
    await this.localeToggle
      .getByRole("button", { name: locale.toUpperCase(), exact: true })
      .click();
  }
}
