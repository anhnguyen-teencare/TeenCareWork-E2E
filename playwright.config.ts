import { defineConfig, devices } from "@playwright/test";
import { ADMIN_STORAGE_STATE, BASE_URL } from "./src/config/env";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // mentor-dev là môi trường dùng chung — giới hạn worker để không dồn tải
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    locale: "vi-VN",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    // Đăng nhập admin 1 lần, lưu storage state cho các project phía dưới
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "chromium-guest",
      testMatch: /tests\/auth\//,
      use: { ...devices["Desktop Chrome"] }, 
    },
    {
      name: "chromium-admin",
      testIgnore: /tests\/auth\//,
      dependencies: ["setup"],
      use: { ...devices["Desktop Chrome"], storageState: ADMIN_STORAGE_STATE },
    },
  ],
});
