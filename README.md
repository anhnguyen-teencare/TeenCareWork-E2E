# TeenCareWork E2E

Automation test cho **TeenCareWork CRM** (https://mentor-dev.teencare.co) — [Playwright](https://playwright.dev) + TypeScript, theo mô hình Page Object Model.

## Trạng thái

| Phase | Nội dung | Trạng thái |
|---|---|---|
| 1 | Auth (login/guard) + smoke CRM Danh sách deal | ✅ Hoàn thành |
| 2 | Tạo deal | 📝 In progress |
| 3 | Đơn hàng + Phụ huynh/Học sinh + Thanh toán | 📝 In progress |
| 4 | OB Upsell pipeline → OB Done | 📝 In progress |
| 5 | Vận hành (cleanup data, tag, notify) | 📝 In progress |

## Bắt đầu

Yêu cầu: **Node.js 20+**

```bash
npm ci
npx playwright install chromium
cp .env.example .env.local   # điền E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD (account admin trên dev)
```

## Chạy test

```bash
npm test                # toàn bộ (headless)
npm run test:headed     # xem browser chạy
npm run test:ui         # Playwright UI mode — debug từng bước
npm run report          # mở HTML report lần chạy gần nhất
npm run typecheck       # kiểm tra TypeScript
```

Chạy theo nhóm:

```bash
npx playwright test --project=chromium-guest   # test đăng nhập/guard (không cần session)
npx playwright test --project=chromium-admin   # test cần session admin
```

## Cấu trúc

```
├── playwright.config.ts        # 3 project: setup → chromium-admin, chromium-guest
├── docs/                       # test plan, scenarios, checklist theo phase
├── src/
│   ├── config/env.ts           # đọc .env.local, validate fail-fast
│   ├── data/text.ts            # text UI thật của app — một chỗ sửa khi app đổi wording
│   ├── fixtures/test.ts        # fixture inject sẵn Page Object vào test
│   ├── components/             # component object dùng chung nhiều trang (vd CRM sidebar)
│   └── pages/                  # Page Object Model — mỗi trang một class
└── tests/
    ├── auth.setup.ts           # login admin 1 lần / run, lưu session .auth/admin.json
    ├── auth/                   # test flow đăng nhập + route guard (chạy không session)
    └── crm/                    # test module CRM (tái dùng session admin)
```

## Cơ chế auth

`tests/auth.setup.ts` login qua UI **một lần mỗi lần chạy** rồi lưu storage state vào `.auth/admin.json` (gitignore). Project `chromium-admin` khai báo `dependencies: ["setup"]` nên mọi test CRM khởi động với session sẵn — nhanh, không lặp login. Flow đăng nhập thật vẫn được test riêng ở `tests/auth/login.spec.ts` (project `chromium-guest`).

Nếu setup fail (sai credential, thiếu env) → Playwright tự skip toàn bộ test phụ thuộc, không tạo false-negative hàng loạt.

## Quy ước viết test

- **Selector**: app không có `data-testid` — ưu tiên `getByRole` → `getByLabel` → `getByText`. Không dùng CSS class/XPath trừ khi bất khả kháng (comment rõ lý do).
- **Text UI** đặt tại `src/data/text.ts`, đối chiếu nguyên văn với UI thật trên môi trường dev — không tự bịa, không rải string trong spec.
- **Page Object chỉ chứa locator + hành động, không assert** — assertion nằm trong spec.
- **Test data**: chỉ assert trên data do test tự tạo (prefix `E2E`) — dev là môi trường dùng chung.
- **Credential** chỉ đọc từ env (`src/config/env.ts`), không hardcode.
- Thêm test mới: Page Object vào `src/pages/` → đăng ký fixture ở `src/fixtures/test.ts` → spec vào `tests/<module>/`.

## CI & test report

`.github/workflows/e2e.yml` chạy trên PR, push `main`, nightly 04:00 (giờ VN) và chạy tay (`workflow_dispatch`).

Report sau mỗi run:

- **Allure report (chỉ run trên `main`/nightly)** — tự deploy lên GitHub Pages, xem trực tiếp có trend history: https://anhnguyen-teencare.github.io/TeenCareWork-E2E/
- **Playwright HTML report (mọi run)** — artifact `playwright-report` trong trang Actions run (giữ 14 ngày), tải về xem bằng `npx playwright show-report <folder>`.

Xem Allure ở local: `npm run report:allure` (cần cài Java vì Allure CLI chạy trên JVM).