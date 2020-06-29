
import * as React from "react";
import { Redirect } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

interface Props {
  box_id: string;
  card_id?: string; // undefined = add a new card
}

const EditCard: React.SFC<Props> = (props) => {
  const box : Box  = All.getBox(props.box_id);
  const card: Card = props.card_id ? box.getCard(props.card_id) : box.addCard();
  const [ done , setDone  ] = React.useState<boolean>(false);
  const [ error, setError ] = React.useState<string>(null);
  const   title_ref = React.useRef<HTMLTextAreaElement>();
  const content_ref = React.useRef<HTMLTextAreaElement>();
  const onCancel = () => {
    if (!props.card_id) {
      box.deleteCard(card.getCardId()); // remove newly-created card
    }
    setDone(true);
  };
  const onSave = () => {
    let errors = [];
    try {
      card.setTitle(title_ref.current.value);
    } catch (e) {
      errors.push(`The title you entered is invalid because it ${e.message}. `);
    }
    try {
      card.setContent(content_ref.current.value);
    } catch (e) {
      errors.push(`The content you entered is invalid because it ${e.message}. `);
    }
    if (errors.length === 0) {
      setError(null);
      setDone(true);
    } else {
      setError(errors.join(""));
    }
  }
  if (done) {
    const redir = props.card_id ? `/card/${props.box_id}/${props.card_id}` : `/box/${props.box_id}`;
    return (
      <Redirect to={redir} />
    );
  }
  return (
    <div className="EditCard">
      <div className="Error">{error || ""}</div>
      <textarea ref={title_ref}   defaultValue={card.getTitle()} />
      <textarea ref={content_ref} defaultValue={card.getContent()} />
      <div className="Buttons">
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCard;
