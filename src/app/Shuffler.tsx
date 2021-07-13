import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

import stylesCardSummary from "./CardSummary.css";
import stylesShuffler from "./Shuffler.css";

interface Props {
  box_id: string;
}

const Shuffler: React.FC<Props> = (props) => {
  const box: Box = All.getBox(props.box_id);
  const children = [];
  box.forEachCardSorted((card, index) =>
    children.push(
      <CardSummary box_id={props.box_id} card={card} key={card.getCardId()} />
    )
  );
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
    <div className={stylesShuffler.Shuffler} onScroll={onScroll}>
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
      <Link to={`/card/${props.box_id}/${props.card.getCardId()}`}>
        {props.card.getTitle()}
      </Link>
    </div>
  );
};
