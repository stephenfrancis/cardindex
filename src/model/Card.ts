
const LS_ALL_PREFIX = "~CI~CARD~";
const MAX_CONTENT_LENGTH = 1000;
const MAX_TITLE_LENGTH = 100;

interface CardData {
  content: string;
  created_at: Date;
  title: string;
}

export default class Card {

  private card_id: string;
  private data: CardData;

  constructor(card_id: string) {
    this.card_id = card_id;
    this.data = {
      content: "",
      created_at: new Date(),
      title: "",
    };
    const json_data = window.localStorage.getItem(LS_ALL_PREFIX + card_id);
    if (json_data) {
      try {
        this.data = JSON.parse(json_data);
      } catch (e) {
        console.error(e);
      }
    }
  }


  public getCardId(): string {
    return this.card_id;
  }


  public getContent(): string {
    return this.data.content;
  }


  public getCreatedAt(): Date {
    return this.data.created_at;
  }


  public getTitle(): string {
    return this.data.title;
  }


  public setContent(content: string): void {
    Card.validateContent(content);
    this.data.content = content;
    this.writeData();
  }


  public setTitle(title: string): void {
    Card.validateTitle(title);
    this.data.title = title;
    this.writeData();
  }


  private static validate(arg: string, max_length: number, mandatory: boolean): void {
    const INVALID_CHARS = /[^\s\w\(\)\[\]\-\.\,\;\:\'\"\/\?\!\#\@\<\>\=\+\*\&\%\$\£]/;
    if (typeof arg !== "string") {
      throw new Error(`must be a string`);
    }
    if ((typeof max_length === "number") && (arg.length > max_length)) {
      throw new Error(`exceeds maximum length of ${max_length} characters`);
    }
    const match = INVALID_CHARS.exec(arg);
    if (match) {
      throw new Error(`contains invalid characters: ${match[0]}`);
    }
    if (mandatory && !arg) {
      throw new Error(`cannot be blank`);
    }
  }


  public static validateContent(arg: string): void {
    this.validate(arg, MAX_CONTENT_LENGTH, false);
  }


  public static validateTitle(arg: string): void {
    this.validate(arg, MAX_TITLE_LENGTH, true);
  }


  private writeData(): void {
    window.localStorage.setItem(LS_ALL_PREFIX + this.card_id, JSON.stringify(this.data));
  }

}
