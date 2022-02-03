import * as React from "react";
import { Navigate } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

import stylesButtons from "./Buttons.css";
import stylesEditCard from "./EditCard.css";
import stylesError from "./Error.css";

interface Props {
  box_id: string;
  card_id?: string; // undefined = add a new card
}

const EditCard: React.FC<Props> = (props) => {
  const [card, setCard] = React.useState<Card>(null);
  const [done, setDone] = React.useState<boolean>(false);
  const [remove, setRemove] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>(null);
  const title_ref = React.useRef<HTMLInputElement>();
  const content_ref = React.useRef<HTMLTextAreaElement>();

  React.useEffect(() => {
    const box: Box = All.getBox(props.box_id);
    if (props.card_id) {
      setCard(box.getCard(props.card_id));
      setRemove(false);
    } else {
      setCard(box.addCard());
      setRemove(true);
    }
    return () => {
      if (remove && box && card) {
        console.log(`deleting card: ${card.getCardId()}`);
        box.deleteCard(card.getCardId()); // remove newly-created card
      }
    };
  }, [props.box_id, props.card_id]);

  const onCancel = () => {
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
      errors.push(
        `The content you entered is invalid because it ${e.message}. `
      );
    }
    if (errors.length === 0) {
      setError(null);
      setDone(true);
      setRemove(false);
    } else {
      setError(errors.join(""));
    }
  };
  if (done) {
    const redir = /* props.card_id
      ? `/card/${props.box_id}/${props.card_id}`
      : */ `/box/${props.box_id}`;
    return <Navigate to={redir} />;
  }

  const renderCard = () => (
    <>
      <div className={stylesError.Error}>{error || ""}</div>
      <input ref={title_ref} defaultValue={card.getTitle()} />
      <textarea ref={content_ref} defaultValue={card.getContent()} />
      <div className={stylesButtons.Buttons}>
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
  return (
    <div className={stylesEditCard.EditCard}>
      {!card && <div>waiting</div>}
      {card && renderCard()}
    </div>
  );
};

export default EditCard;
