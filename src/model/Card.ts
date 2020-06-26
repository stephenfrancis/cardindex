
const LS_ALL_PREFIX = "~CI~CARD~";
const MAX_CONTENT_LENGTH = 1000;
const MAX_TITLE_LENGTH = 100;

export default class Card {

  private card_id: string;
  private title: string;
  private content: string;

  constructor(card_id: string) {
    this.card_id = card_id;
    this.title = "<unknown>";
    this.content = "";
    const json_data = window.localStorage.getItem(LS_ALL_PREFIX + card_id);
    if (json_data) {
      try {
        const data = JSON.parse(json_data);
        this.title = data.title;
        this.content = data.content;
      } catch (e) {
        console.error(e);
      }
    }
  }


  public getCardId(): string {
    return this.card_id;
  }


  public getContent(): string {
    return this.content;
  }


  public getTitle(): string {
    return this.title;
  }


  public setContent(content: string): void {
    Card.validateContent(content);
    this.content = content;
    this.writeData();
  }


  public setTitle(title: string): void {
    Card.validateTitle(title);
    this.title = title;
    this.writeData();
  }


  private static validate(arg: string, max_length: number): void {
    const INVALID_CHARS = /[^\s\w\(\)\[\]\-\.\,\;\:\'\"\/\?\!\#\@\<\>]/;
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
  }


  public static validateContent(arg: string): void {
    this.validate(arg, MAX_CONTENT_LENGTH);
  }


  public static validateTitle(arg: string): void {
    this.validate(arg, MAX_TITLE_LENGTH);
  }


  private writeData(): void {
    window.localStorage.setItem(LS_ALL_PREFIX + this.card_id, JSON.stringify({
      title: this.title,
      content: this.content,
    }));
  }

}
