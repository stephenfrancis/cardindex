
import Box from "./Box";
import * as Utils from "./Utils";


const LS_ALL_KEY = "~CI~ALL";

class All {

  private boxes: { [key: string]: Box };

  constructor () {
    this.boxes = {};
    const box_keys = window.localStorage.getItem(LS_ALL_KEY);
    if (box_keys) {
      try {
        (JSON.parse(box_keys) as string[])
          .forEach(box_key => this.boxes[box_key] = null);
      } catch (e) {
        console.error(e);
      }
    }
  }


  public addBox(): Box {
    const box_id: string = Utils.getHash();
    this.boxes[box_id] = new Box(box_id);
    this.writeBoxes();
    return this.boxes[box_id];
  }


  public deleteBox(box_id: string): void {
    this.getBox(box_id).remove();
    delete this.boxes[box_id];
    this.writeBoxes();
  }


  public forEachBox(callback: (box: Box, box_id: string) => void): void {
    Object.keys(this.boxes)
      .forEach(box_id => callback(this.boxes[box_id], box_id));
  }


  public getBox(box_id: string): Box {
    if (this.boxes[box_id] === null) {
      this.boxes[box_id] = new Box(box_id);
    }
    if (!(this.boxes[box_id] instanceof Box)) {
      throw new Error(`unrecognized box id: '${box_id}'`);
    }
    return this.boxes[box_id];
  }


  private writeBoxes(): void {
    window.localStorage.setItem(LS_ALL_KEY, JSON.stringify(Object.keys(this.boxes)));
  }

}

const all = new All();

export default all;
