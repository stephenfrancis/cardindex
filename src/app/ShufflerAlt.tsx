
import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

interface Props {
  box_id: string;
}

const ShufflerAlt: React.SFC<Props> = (props) => {
  const box: Box = All.getBox(props.box_id);
  const children = [];
  box.forEachCardSorted((card, index) =>
    children.push(<CardSummary box_id={props.box_id} card={card} key={card.getCardId()} />));

  return (
    <div
        className="Shuffler"
    >
      {children}
    </div>
  );
};

export default ShufflerAlt;


interface CardProps {
  box_id: string;
  card: Card;
}

const CardSummary: React.SFC<CardProps> = (props) => {
  return (
    <div className="CardSummary">
      <Link to={`/card/${props.box_id}/${props.card.getCardId()}`}>{props.card.getTitle()}</Link>
    </div>
  );
}
