
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
    <div>
      <div>
        <Link to={`/box/${props.box_id}`}>Box: {box.getTitle()}</Link>
      </div>
      <div className="ShowCard">
        <div>{card.getTitle()}</div>
        <div>{card.getContent()}</div>
      </div>
      <button onClick={props.toggleEdit}>Edit</button>
    </div>
  );
};

export default ShowCard;
