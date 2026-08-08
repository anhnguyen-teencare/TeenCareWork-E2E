import { TEXT } from "./text";

/**
 * Sinh test data duy nhất cho mỗi lần chạy — prefix E2E để nhận diện
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

/** Mã gói huấn luyện có sẵn trên môi trường dev, dùng cho test tạo đơn hàng. */
export const TRAINING_PACKAGE_CODE = "huan_luyen_3m";
