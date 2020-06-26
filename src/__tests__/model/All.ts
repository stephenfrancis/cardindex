
import All from "../../model/All";

test("initial state", () => {
  expect(() => {
    All.getBox("blah")
  }).toThrowError("unrecognized box id: 'blah'");

  expect(() => {
    All.deleteBox("blah")
  }).toThrowError("unrecognized box id: 'blah'");

  let count = 0;
  All.forEachBox(() => count += 1);
  expect(count).toBe(0);
});

test("add one box then delete", () => {
  const new_box = All.addBox();
  const box_id = new_box.getBoxId();
  expect(All.getBox(box_id)).toEqual(new_box);

  let count = 0;
  let retrieved_box;
  All.forEachBox((box) => {
    retrieved_box = box;
    count += 1;
  });
  expect(count).toBe(1);
  expect(retrieved_box).toEqual(new_box);

  All.deleteBox(box_id);

  expect(() => {
    All.getBox(box_id)
  }).toThrowError(`unrecognized box id: '${box_id}'`);

  count = 0;
  All.forEachBox(() => count += 1);
  expect(count).toBe(0);

});
