
import Box from "../../model/Box";

test("initial state", () => {
  const box: Box = new Box("blah");

  expect(() => {
    box.deleteCard("foo");
  }).toThrowError("unrecognized card id: 'foo'");

  let count = 0;
  box.forEachCard(() => count += 1);
  expect(count).toBe(0);

  expect(box.getBoxId()).toBe("blah");

  expect(() => {
    box.getCard("foo");
  }).toThrowError("unrecognized card id: 'foo'");

  expect(box.getTitle()).toBe("<unknown>");
});


test("set title", () => {
  const box: Box = new Box("blah");
  box.setTitle("foo bar");
  expect(box.getTitle()).toBe("foo bar");
});

test("add a card", () => {
  const box: Box = new Box("blah");
  const card = box.addCard();
  const card_id = card.getCardId();
  expect(box.getCard(card_id)).toEqual(card);

  let count = 0;
  let retrieved_card;
  box.forEachCard((temp_card) => {
    retrieved_card = temp_card;
    count += 1;
  });
  expect(count).toBe(1);
  expect(retrieved_card).toEqual(card);

  box.deleteCard(card_id);

  expect(() => {
    box.getCard(card_id)
  }).toThrowError(`unrecognized card id: '${card_id}'`);

  count = 0;
  box.forEachCard(() => count += 1);
  expect(count).toBe(0);
});

test("sorting", () => {
  const box: Box = new Box("blah");
  const cards = [];
  cards[1] = box.addCard();
  cards[1].setTitle("Bertie");

  cards[2] = box.addCard();
  cards[2].setTitle("Charlie");

  cards[0] = box.addCard();
  cards[0].setTitle("Alfie");

  box.forEachCardSorted((card, index) => {
    expect(card).toEqual(cards[index]);
  });

  expect(box.getIndexByFirstLetter("A")).toBe(0);
  expect(box.getIndexByFirstLetter("B")).toBe(1);
  expect(box.getIndexByFirstLetter("C")).toBe(2);
});
