import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

dotenv.config({ path: [path.join(rootDir, ".env.local"), path.join(rootDir, ".env")] });

export const BASE_URL = process.env.E2E_BASE_URL ?? "https://mentor-dev.teencare.co";

/** File session sinh bởi tests/auth.setup.ts — các project khai báo storageState sẽ tái dùng. */
export const ADMIN_STORAGE_STATE = path.join(rootDir, ".auth/admin.json");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Thiếu biến môi trường ${name}. Copy .env.example thành .env.local rồi điền giá trị.`,
    );
  }
  return value;
}

/** Chỉ gọi trong test/setup cần đăng nhập thật */
export function adminCredentials(): { email: string; password: string } {
  return {
    email: requireEnv("E2E_ADMIN_EMAIL"),
    password: requireEnv("E2E_ADMIN_PASSWORD"),
  };
}
