/**
 * Text UI thật của app.
 * App không có data-testid nên selector dựa trên role + text —
 * khi app đổi wording chỉ cần sửa tại đây.
 */
export const TEXT = {
  login: {
    heading: "Đăng nhập hệ thống",
    emailLabel: "Email",
    passwordLabel: "Mật khẩu",
    submitButton: "Đăng nhập",
  },
  crmDealList: {
    heading: { vi: "Danh sách deal", en: "Deal list" },
    dealCount: /Tìm thấy:\s*[\d.,]+\s*Deal/,
    addDealButton: "Thêm deal mới",
    /** Nút mở dropdown chứa tuỳ chọn đổi view (Một dòng / Kanban) */
    otherMenuButton: "Khác",
    /** Option chuyển sang kanban view trong dropdown "Khác" */
    kanbanViewOption: "Kanban",
    /** Cột kanban đầu tiên của lead mới */
    firstKanbanColumn: "L1.1 - Số mới",
    /** aria-label của cụm nút chuyển ngôn ngữ VI/EN */
    localeToggleLabel: "Deal language",
  },
  crmSidebar: {
    dashboard: "Dashboard",
    deal: "Deal",
    order: "Đơn hàng",
  },
} as const;
