
import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

interface Props {
  box_id: string;
  card_id: string;
}

const ShowCard: React.SFC<Props> = (props) => {
  const box : Box  = All.getBox(props.box_id);
  const card: Card = box.getCard(props.card_id);
  const created_at: Date = card.getCreatedAt();
  const keyListener = (event: KeyboardEvent) => {
    console.log(`key: ${event.key}, shift? ${event.shiftKey}, ctrl? ${event.ctrlKey}`);
    // if (event.ctrlKey && event.key.toUpperCase() === "E") {
    // }
  };
  React.useEffect(() => {
    window.addEventListener("keyup", keyListener);
    return () => { // clean-up function
      window.removeEventListener("keyup", keyListener);
    }
  }, []); // don't re-invoke
  return (
    <div className="ShowCard">
      <div>
        <div>{card.getTitle()}</div>
        <div>{card.getContent()}</div>
      </div>
      <div>Created at: {created_at && created_at.toLocaleString()}</div>
      <div className="Buttons">
        <Link to={`/box/${props.box_id}`} >Back</Link>
        <Link to={`/card/${props.box_id}/${props.card_id}/edit`} >Edit</Link>
        <Link to={`/card/${props.box_id}/${props.card_id}/delete`} >Delete</Link>
      </div>
    </div>
  );
};

export default ShowCard;
