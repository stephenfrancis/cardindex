import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./FirstLetterIndex.css";

interface Props {
  box_id: string;
}

const FirstLetterIndex: React.FC<Props> = (props) => {
  const selectLetter = (letter_code: number) => {
    const scroll_to =
      (document.querySelector(`#marker_${letter_code}`) as HTMLElement)
        .offsetTop - 130;

    document.querySelector(`#shuffler`).scrollTo(0, scroll_to);
  };
  const children = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
    <a key={letter} onClick={selectLetter.bind(this, letter.charCodeAt(0))}>
      {letter}
    </a>
  ));
  return (
    <div className={styles.FirstLetterIndex}>
      {children}
      <Link to={`/card/${props.box_id}/add`} className="Add">
        ➕
      </Link>
    </div>
  );
};

export default FirstLetterIndex;
