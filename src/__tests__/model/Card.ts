
import C from "../../model/Card";
import Card from "../../model/Card";

test("initial state", () => {
  const card: Card = new Card("blah");
  expect(card.getTitle()).toEqual("");
  expect(card.getContent()).toEqual("");
  card.setTitle("Raggedy");
  card.setContent("Mapplewhaite");
  expect(card.getCardId()).toEqual("blah");
  expect(card.getTitle()).toEqual("Raggedy");
  expect(card.getContent()).toEqual("Mapplewhaite");
});


test("validation", () => {
  const card: Card = new Card("blah");
  expect(() => {
    card.setTitle(null);
  }).toThrowError(`must be a string`);
  expect(() => {
    card.setTitle("b".repeat(101));
  }).toThrowError(`exceeds maximum length of 100 characters`);
  expect(() => {
    card.setContent("b".repeat(1001));
  }).toThrowError(`exceeds maximum length of 1000 characters`);
  expect(() => {
    card.setTitle("blah~blah");
  }).toThrowError(`contains invalid characters: ~`);
});
