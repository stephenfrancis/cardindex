
import * as React from "react";
import Data from "./Data";

interface Props {
  setStartAt: (start_at: number) => void;
}

const FirstLetterIndex: React.SFC<Props> = (props) => {
  // const [ letter_selected, selectLetter ] = React.useState("");
  const selectLetter = (letter: string) => {
    const new_index = Data.getCardIndexByFirstLetter(letter);
    console.log(`selectLetter(${letter}) => ${new_index}`);
    props.setStartAt(new_index);
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
