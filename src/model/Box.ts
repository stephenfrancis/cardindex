
import Card from "./Card";
import * as Utils from "./Utils";

const LS_ALL_PREFIX = "~CI~BOX~";

export default class Box {

  private box_id: string;
  private box_title: string;
  private cards: { [key: string]: Card }; // primary storage structure
  private cards_sorted: Card[]; // secondary structure - only populated if sort required
  private scroll_position: number;

  constructor(box_id: string) {
    this.box_id = box_id;
    this.box_title = "<unknown>";
    this.cards = {};
    this.cards_sorted = null;
    this.scroll_position = 0;
    const box_info_str = window.localStorage.getItem(LS_ALL_PREFIX + box_id);
    if (box_info_str) {
      try {
        let box_data = JSON.parse(box_info_str);
        if (Array.isArray(box_data)) {
          box_data = {
            card_keys: box_data,
          };
        }
        (box_data.card_keys as string[])
          .forEach(card_key => this.cards[card_key] = null);
        this.box_title = box_data.box_title || this.box_title;
        this.scroll_position = box_data.scroll_position || this.scroll_position;
      } catch (e) {
        console.error(e);
      }
    }
  }


  public addCard(): Card {
    const card_id: string = Utils.getHash();
    this.cards[card_id] = new Card(card_id);
    this.writeData();
    if (this.cards_sorted) {
      this.cards_sorted.push(this.cards[card_id]);
    }
    return this.cards[card_id];
  }


  public deleteCard(card_id: string): void {
    if (typeof this.cards[card_id] === "undefined") {
      throw new Error(`unrecognized card id: '${card_id}'`);
    }
    if (this.cards_sorted) {
      this.cards_sorted.splice(this.cards_sorted.indexOf(this.cards[card_id]), 1);
    }
    delete this.cards[card_id];
    this.writeData();
  }


  public forEachCard(callback: (card: Card, card_id: string) => void): void {
    Object.keys(this.cards)
      .forEach(card_id => callback(this.cards[card_id], card_id));
  }


  public forEachCardSorted(callback: (card: Card, index: number) => void): void {
    this.sort();
    this.cards_sorted
      .forEach((card, index) => callback(card, index));
  }


  public getBoxId(): string {
    return this.box_id;
  }


  public getCard(card_id: string): Card {
    if (this.cards[card_id] === null) {
      this.cards[card_id] = new Card(card_id);
    }
    if (!(this.cards[card_id] instanceof Card)) {
      throw new Error(`unrecognized card id: '${card_id}'`);
    }
    return this.cards[card_id];
  }



  public getIndexByFirstLetter(char: string): number {
    let out: number = 0;
    this.sort();
    this.cards_sorted.forEach((card: Card, index: number) => {
      if (char.toUpperCase() > card.getTitle().charAt(0).toUpperCase()) {
        out = (index + 1);
      }
    });
    if (out === this.cards_sorted.length) {
      out -= 1;
    }
    return out;
  }


  public getScrollPosition(): number {
    return this.scroll_position;
  }


  public getTitle(): string {
    return this.box_title;
  }


  public remove(): void {
    this.forEachCard((card: Card, card_id: string) => this.deleteCard(card_id));
    window.localStorage.removeItem(LS_ALL_PREFIX + this.box_id);
  }


  public setScrollPosition(arg: number): void {
    this.scroll_position = arg;
    this.writeData();
  }


  public setTitle(arg: string): void {
    this.box_title = arg;
    this.writeData();
  }


  private sort(): void {
    if (!this.cards_sorted) {
      this.cards_sorted = [];
    }
    if (this.cards_sorted.length === 0) {
      Object.keys(this.cards)
        .forEach(card_id => this.cards_sorted.push(this.getCard(card_id)));
    }
    if (this.cards_sorted.length < Object.keys(this.cards).length) {
      throw new Error(`cards_sorted array is incomplete`);
    }
    this.cards_sorted.sort((a: Card, b: Card) => {
      return a.getTitle() < b.getTitle() ? -1 : 1;
    });
  }


  private writeData(): void {
    window.localStorage.setItem(LS_ALL_PREFIX + this.box_id, JSON.stringify({
      box_title: this.box_title,
      card_keys: Object.keys(this.cards),
      scroll_position: this.scroll_position,
    }));
  }

}
