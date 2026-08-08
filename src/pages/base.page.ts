import type { Page } from "@playwright/test";

/** Base cho mọi Page Object: giữ page instance + điều hướng theo path của trang. */
export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }
}
