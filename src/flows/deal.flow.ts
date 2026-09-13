import type { NewDealDialog } from "../components/new-deal-dialog.component";
import { type ParentInput, generateParent } from "../data/factories";
import type { DealListPage } from "../pages/crm/deal-list.page";

/**
 * Tạo deal New với PH mới rồi trả về PH đã dùng — cho test cần sẵn một deal làm nền.
 * Test lấy chính việc tạo deal làm đối tượng kiểm thử thì gọi thẳng Page Object,
 * không dùng helper này.
 */
export async function createDealWithNewParent(
  dealListPage: DealListPage,
  newDealDialog: NewDealDialog,
): Promise<ParentInput> {
  const parent = generateParent();

  await dealListPage.goto();
  await dealListPage.addDealButton.click();
  await newDealDialog.createNewDeal(parent);

  return parent;
}
