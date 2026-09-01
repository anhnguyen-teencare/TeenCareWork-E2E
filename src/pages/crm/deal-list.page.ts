import type { Locator, Page } from "@playwright/test";
import { CrmSidebar } from "../../components/crm-sidebar.component";
import { TEXT } from "../../data/text";
import { BasePage } from "../base.page";

export type DealLocale = "vi" | "en";

/** Trang Danh sách deal (/crm endpoint) */
export class DealListPage extends BasePage {
  protected readonly path = "/crm";

  readonly sidebar: CrmSidebar;
  readonly dealCount: Locator;
  readonly addDealButton: Locator;
  readonly firstKanbanColumn: Locator;
  private readonly languageSwitcher: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = new CrmSidebar(page);
    this.dealCount = page.getByText(TEXT.crmDealList.dealCount);
    this.addDealButton = page.getByRole("button", { name: TEXT.crmDealList.addDealButton });
    this.firstKanbanColumn = page.locator("span.truncate", {
      hasText: TEXT.crmDealList.newDealStage,
    });
    this.languageSwitcher = page.getByRole("group", { name: TEXT.languageSwitcher.group });
  }

  /** Tìm deal theo mã/SĐT/email — search chỉ áp dụng khi nhấn Enter. */
  async searchDeals(query: string): Promise<void> {
    const searchBox = this.page.getByPlaceholder(TEXT.crmDealList.searchPlaceholder);
    await searchBox.fill(query);
    await searchBox.press("Enter");
  }

  /** Row trong table view chứa SĐT (table là view mặc định với session mới). */
  dealRow(phone: string): Locator {
    return this.page.getByRole("row", { name: phone });
  }

  /** Mở chi tiết deal — nút xem là icon-only không có accessible name, là button đầu tiên của row. */
  async openDealDetail(phone: string): Promise<void> {
    await this.dealRow(phone).getByRole("button").first().click();
  }

  /**
   * Deal list mặc định mở ở view "Một dòng" (table) với session mới —
   * view lưu localStorage nên phải chủ động chuyển sang Kanban trước khi assert cột.
   */
  async switchToKanbanView(): Promise<void> {
    // exact: true vì trang còn filter tab "Khác +" — không exact sẽ match cả hai
    await this.page
      .getByRole("button", { name: TEXT.crmDealList.otherMenuButton, exact: true })
      .click();
    await this.page
      .getByRole("menuitemradio", { name: TEXT.crmDealList.kanbanViewOption, exact: true })
      .click();
  }

  /** Heading đổi theo ngôn ngữ deal đang chọn nên nhận locale thay vì cố định. */
  heading(locale: DealLocale): Locator {
    return this.page.getByRole("heading", { name: TEXT.crmDealList.heading[locale] });
  }

  /** Đổi ngôn ngữ toàn app qua LanguageSwitcher trên header CRM — heading deal đổi theo. */
  async switchLocale(locale: DealLocale): Promise<void> {
    await this.languageSwitcher.getByRole("button", { name: TEXT.languageSwitcher[locale] }).click();
  }
}
