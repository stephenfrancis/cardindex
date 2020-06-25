
import * as React from "react";
import All from "../model/All";
import Box from "../model/Box";

interface Props {
  box_id: string;
}

const FirstLetterIndex: React.SFC<Props> = (props) => {
  const box: Box = All.getBox(props.box_id);

  // const [ letter_selected, selectLetter ] = React.useState("");
  const selectLetter = (letter: string) => {
    const new_index = box.getIndexByFirstLetter(letter);
    console.log(`selectLetter(${letter}) => ${new_index}`);
    const scroll_to = (new_index
      && (document.querySelector(`.Shuffler > div:nth-child(${new_index})`) as HTMLElement).offsetTop
      || 0) - 120;

    console.log(`start_at_index: ${new_index} => ${scroll_to}`);
    document.querySelector(`.Shuffler`).scrollTo(0, scroll_to);

  };
  const children = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    .map(letter => (
      <a
        // className={letter_selected === letter ? "selected" : ""}
        key={letter}
        onClick={selectLetter.bind(this, letter)}
      >{letter}</a>
    ));
  return (
    <div className="FirstLetterIndex">
      {children}
    </div>
  );
};

export default FirstLetterIndex;


const nextLevelDown: React.SFC<Props> = (props) => {
  return (
    <div className="NextLevelDown">
      {props.children}
    </div>
  );
};
