import { TEXT } from "./text";

/**
 * Test data cho CRM: hàm sinh data duy nhất cho mỗi lần chạy — prefix E2E để nhận diện
 * data do automation tạo ra trên môi trường dev.
 */

export interface ParentInput {
  name: string;
  phone: string;
  email: string;
  grade: string;
}

export interface StudentInput {
  name: string;
  parentRole: (typeof TEXT.studentDialog.parentRoles)[number];
  dateOfBirth: string;
}

/** Suffix duy nhất theo thời gian + random để test chạy parallel không đụng nhau. */
function uniqueSuffix(): string {
  return `${Date.now()}${Math.floor(Math.random() * 100)}`.slice(-8);
}

export function generateParent(): ParentInput {
  const suffix = uniqueSuffix();
  return {
    name: `E2E PH ${suffix}`,
    // SĐT VN hợp lệ: 10 số, đầu 09
    phone: `09${suffix}`,
    email: `e2e.${suffix}@example.com`,
    grade: "Lớp 8",
  };
}

export function generateStudent(): StudentInput {
  return {
    name: `E2E HS ${uniqueSuffix()}`,
    parentRole: "Mẹ",
    dateOfBirth: "01/01/2012",
  };
}

/**
 * Gói sản phẩm dùng cho test tạo đơn hàng.
 * `name` chỉ dùng đặt tên test cho dễ đọc, không phải selector.
 */
export const TEST_PACKAGES = [
  { code: "TC1W", name: "TeenCare 1 tuần" },
  { code: "huan_luyen_3m", name: "Gói Huấn Luyện 3 tháng" },
  { code: "huan_luyen_6m", name: "Gói Huấn Luyện 6 tháng" },
  { code: "huan_luyen_12m", name: "Gói Huấn Luyện 12 tháng" },
] as const;
