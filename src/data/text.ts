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
    searchPlaceholder: "Mã, Số điện thoại",
    /** Nút mở dropdown chứa tuỳ chọn đổi view (Một dòng / Kanban) */
    otherMenuButton: "Khác",
    /** Option chuyển sang kanban view trong dropdown "Khác" */
    kanbanViewOption: "Kanban",
    /** Trạng thái đầu tiên của deal New — cũng là cột kanban đầu tiên */
    newDealStage: "L1.1 - Số mới",
    /** Trạng thái deal New khi đơn đã thanh toán đủ 100% */
    paidFullStage: "L8.2 - Khách đã thanh toán toàn bộ",
    /** Trạng thái đầu tiên của deal OB Upsell (hệ thống tự sinh sau thanh toán) */
    upsellFirstStage: "L8 New",
  },
  /**
   * Cụm nút VI/EN đổi ngôn ngữ toàn app trên header CRM (LanguageSwitcher).
   * aria-label của group lẫn từng nút đều đổi theo ngôn ngữ đang chọn nên phải match cả 2 dạng.
   */
  languageSwitcher: {
    group: /^(Ngôn ngữ|Language)$/,
    vi: /^(Tiếng Việt|Vietnamese)$/,
    en: /^(Tiếng Anh|English)$/,
  },
  crmSidebar: {
    dashboard: "Dashboard",
    deal: "Deal",
    order: "Đơn hàng",
  },
  newDealDialog: {
    title: "Thông tin deal",
    parentNamePlaceholder: "Tên PH",
    phonePlaceholder: "Số điện thoại",
    emailPlaceholder: "Email",
    gradePlaceholder: "Lớp của con",
    saveButton: "Lưu",
  },
  dealDetail: {
    ordersTab: "Đơn hàng",
    addOrderButton: "Thêm mới",
    /** Nút "Thêm mới" đổi thành text này khi deal đã có đơn hàng */
    orderCreatedButton: "Đã có đơn hàng",
    closeButton: "Đóng lại",
  },
  orderDialog: {
    title: "Tạo đơn hàng mới",
    customerPlaceholder: "Chưa chọn học sinh",
    addStudentButton: "Thêm",
    productDropdown: "-- Chọn sản phẩm --",
    productSearchPlaceholder: "Tìm kiếm mã hoặc tên sản phẩm...",
    emailPlaceholder: "Nhập email phụ huynh",
    invoiceMethodPlaceholder: "Chọn phương thức hoá đơn",
    invoiceMethods: ["COD", "Banking", "Thẻ", "Khác"],
    saveButton: "Lưu",
  },
  orderDetailDialog: {
    title: "Chi tiết đơn hàng",
    remainingLabel: "Còn lại:",
    addPaymentButton: "Thêm thanh toán",
    amountLabel: "Số tiền thanh toán",
    paidDateLabel: "Ngày thanh toán",
    statusLabel: "Trạng thái thanh toán",
    statusDone: "Done",
    /** Label kèm dấu * bắt buộc nên match bằng đầu chuỗi */
    collectorLabel: /^Người thu tiền/,
    collectorSearchPlaceholder: "Tìm kiếm người thu tiền (tên hoặc email)...",
    transferContentPlaceholder: "Nội dung CK",
    /** Nút đóng thông báo email gói (có thể hiện sau khi lưu thanh toán) */
    packageEmailConfirm: "Đã hiểu",
    saveButton: "Lưu",
  },
  studentDialog: {
    title: "Thêm học sinh mới",
    parentRoleLabel: "Vai trò của phụ huynh",
    parentRoles: ["Bố", "Mẹ"],
    studentNameLabel: "Tên học sinh",
    dateOfBirthLabel: "Ngày sinh (dd/mm/yyyy)",
    saveButton: "Lưu",
  },
} as const;
