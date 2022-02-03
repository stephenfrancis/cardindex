import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

import stylesCardSummary from "./CardSummary.css";
import stylesShuffler from "./Shuffler.css";
import stylesFirstLetterIndex from "./FirstLetterIndex.css";

interface Props {
  box_id: string;
}

const Shuffler: React.FC<Props> = (props) => {
  const box: Box = All.getBox(props.box_id);

  let last_letter_code = 64;
  const addLettersBetween = (letter_code: number) => {
    if (letter_code === last_letter_code) return;
    const letters = [];
    for (let i = last_letter_code + 1; i <= letter_code; i += 1) {
      letters.push(
        <a key={`marker_${i}`} id={`marker_${i}`}>
          {String.fromCharCode(i)}
        </a>
      );
    }
    last_letter_code = letter_code;
    return (
      <div
        key={`marker_group_${letter_code}`}
        className={stylesFirstLetterIndex.FirstLetterIndex}
      >
        {letters}
      </div>
    );
  };

  const children = [];
  box.forEachCardSorted((card) => {
    const letter_code = card.getTitle().toUpperCase().charCodeAt(0);
    children.push(addLettersBetween(letter_code));
    children.push(
      <CardSummary box_id={props.box_id} card={card} key={card.getCardId()} />
    );
  });
  children.push(addLettersBetween(90)); // any remaining letters
  React.useEffect(() => {
    const elmt = document.querySelector(stylesShuffler.Shuffler);
    if (elmt) {
      elmt.scrollTo(0, box.getScrollPosition());
    }
  }, [props.box_id]);
  let pending = false;
  const onScroll = () => {
    if (!pending) {
      pending = true;
      setTimeout(() => {
        const elmt = document.querySelector(stylesShuffler.Shuffler);
        if (elmt) {
          box.setScrollPosition(elmt.scrollTop);
        }
        pending = false;
      }, 100);
    }
  };

  return (
    <div className={stylesShuffler.Shuffler} id="shuffler" onScroll={onScroll}>
      {children}
    </div>
  );
};

export default Shuffler;

interface CardProps {
  box_id: string;
  card: Card;
}

const CardSummary: React.FC<CardProps> = (props) => {
  return (
    <div className={stylesCardSummary.CardSummary}>
      <Link to={`/card/${props.box_id}/${props.card.getCardId()}/edit`}>
        {props.card.getTitle()}
      </Link>
    </div>
  );
};
