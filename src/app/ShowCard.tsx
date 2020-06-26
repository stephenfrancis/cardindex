
import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

interface Props {
  box_id: string;
  card_id: string;
  toggleEdit: () => void;
}

const ShowCard: React.SFC<Props> = (props) => {
  const box : Box  = All.getBox(props.box_id);
  const card: Card = box.getCard(props.card_id);
  return (
    <div className="ShowCard">
      <div>
        <div>{card.getTitle()}</div>
        <div>{card.getContent()}</div>
      </div>
      <div className="Buttons">
        <Link to={`/box/${props.box_id}`} >Back</Link>
        <button onClick={props.toggleEdit}>Edit</button>
        <Link to={`/deletecard/${props.box_id}/${props.card_id}`} >Delete</Link>
      </div>
    </div>
  );
};

export default ShowCard;
