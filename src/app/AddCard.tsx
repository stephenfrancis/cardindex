
import * as React from "react";
import { Redirect } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";
import EditCard from "./EditCard";

interface Props {
  box_id: string;
}

const AddCard: React.SFC<Props> = (props) => {
  const box : Box  = All.getBox(props.box_id);
  const card: Card = box.addCard();
  const [ done, setDone ] = React.useState<boolean>(false);

  const toggleEdit = (saved: boolean) => {
    if (!saved) {
      box.deleteCard(card.getCardId());
    }
    setDone(true);
  }
  if (done) {
    return (
      <Redirect to={`/box/${props.box_id}`} />
    );
  }
  return (
    <EditCard box_id={props.box_id} card_id={card.getCardId()} toggleEdit={toggleEdit} />
  );
}

export default AddCard;
