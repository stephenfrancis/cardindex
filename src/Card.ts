
export default class Card {

  private title: string;
  private content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }


  public getContent(): string {
    return this.content;
  }


  public getTitle(): string {
    return this.title;
  }

}
