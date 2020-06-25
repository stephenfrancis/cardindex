
import Card from "./Card";

export class IndexNode {
  protected child_nodes: { [key: string]: IndexNode };
  private term: string;

  constructor(term) {
    this.term = term;
    this.child_nodes = {};
  }


  public addTerm(term: string, card: Card): void {
    throw new Error(`must be overridden`);
  }


  public getChildNodes(): IndexNode[] {
    return Object.values(this.child_nodes);
  }


  public getTerm(): string {
    return this.term;
  }

}


class IndexNodeRoot extends IndexNode {

  constructor(term: string) {
    super(term);
  }

  public addTerm(term: string, card: Card): void {
    const initial = term.substr(0, 1);
    if (!this.child_nodes[initial]) {
      this.child_nodes[initial] = new IndexNodeLetter(initial);
    }
    this.child_nodes[initial].addTerm(term, card);
  }

}


class IndexNodeLetter extends IndexNode {

  constructor(term: string) {
    super(term);
  }

  public addTerm(term: string, card: Card): void {
    if (!this.child_nodes[term]) {
      this.child_nodes[term] = new IndexNodeTerm(term);
    }
    this.child_nodes[term].addTerm(term, card);
  }

}


class IndexNodeTerm extends IndexNode {
  private cards: Card[];

  constructor(term: string) {
    super(term);
  }

  public addTerm(term: string, card: Card): void {
    if (!this.cards) {
      this.cards = [];
    }
    // console.log(`adding card ${card.getTitle()} with term ${term}`);
    this.cards.push(card);
  }

}


export class Data {
  private index_root: IndexNodeRoot;

  constructor() {
    this.index_root = new IndexNodeRoot("root");
  }



  private addTitleToIndex(card: Card): void {
    const terms = card.getTitle().toLowerCase().replace(/\W/g, " ").split(" ");
    terms.forEach((term) => term && this.index_root.addTerm(term, card));
  }


  public getRootIndexNode(): IndexNode {
    return this.index_root;
  }



}

export default new Data();
