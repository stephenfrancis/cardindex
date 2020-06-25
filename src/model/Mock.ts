
import All from "../model/All";
import Box from "./Box";
import test_data from "../test_data.json";

const box_ids: string[] = [];

All.forEachBox((box: Box, box_id: string) => box_ids.push(box_id));

export function ensureAtLeastOneBoxPresent(): void {
  if (box_ids.length === 0) {
    const box: Box = All.addBox();
    try {
      box_ids.push(box.getBoxId());
      test_data.forEach(item => {
        const card = box.addCard();
        let title = item.title;
        if (title.length > 100) {
          title = title.substr(0, 100);
          console.log(`truncated title for card '${item.title}`);
        }
        card.setTitle(title);
        let content = item.content;
        if (content.length > 500) {
          content = content.substr(0, 500);
          console.log(`truncated content for card '${item.title}`);
        }
        card.setContent(content);
      });
    } catch (e) {
      console.error(e);
      All.deleteBox(box.getBoxId()); // clean-up
    }
  }
}


export function getFirstBoxId(): string {
  return box_ids[0];
}
