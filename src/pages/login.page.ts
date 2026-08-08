import type { Locator, Page } from "@playwright/test";
import { TEXT } from "../data/text";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  protected readonly path = "/login";

  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  /** Dòng lỗi dưới form — app render <p class="text-destructive">, không có role riêng */
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { name: TEXT.login.heading });
    this.emailInput = page.getByLabel(TEXT.login.emailLabel);
    this.passwordInput = page.getByLabel(TEXT.login.passwordLabel);
    this.submitButton = page.getByRole("button", { name: TEXT.login.submitButton });
    this.errorMessage = page.locator("form p.text-destructive");
  }

  /** Điền form và submit — không assert kết quả, test tự quyết định expect. */
  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
