import * as React from "react";
import { Redirect } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

import stylesButtons from "./Buttons.css";
import stylesShowCard from "./ShowCard.css";

interface Props {
  box_id: string;
  card_id: string;
}

const DeleteCard: React.FC<Props> = (props) => {
  const [done, setDone] = React.useState<boolean>(false);
  if (done) {
    return <Redirect to={`/box/${props.box_id}`} />;
  }
  const box: Box = All.getBox(props.box_id);
  const card: Card = box.getCard(props.card_id);
  const onCancel = () => {
    setDone(true);
  };
  const onSave = () => {
    box.deleteCard(props.card_id);
    setDone(true);
  };
  return (
    <div className={stylesShowCard.ShowCard}>
      <div>
        <div>DELETING: {card.getTitle()}</div>
        <div>{card.getContent()}</div>
      </div>
      <div className={stylesButtons.Buttons}>
        <button onClick={onSave}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteCard;
