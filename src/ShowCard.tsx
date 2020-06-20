
import * as React from "react";
import Card from "./Card";

interface Props {
  card: Card;
  mode?: string;
}

const ShowCard: React.SFC<Props> = (props) => {
  return (
    <div className="Card">
      <div>{props.card.getTitle()}</div>
      {(props.mode === "main") && (
        <div>{props.card.getContent()}</div>
      )}
    </div>
  );
};

export default ShowCard;
