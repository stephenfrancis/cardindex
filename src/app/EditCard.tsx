
import * as React from "react";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

interface Props {
  box_id: string;
  card_id: string;
  toggleEdit: (saved: boolean) => void;
}

const EditCard: React.SFC<Props> = (props) => {
  const box : Box  = All.getBox(props.box_id);
  const card: Card = box.getCard(props.card_id);
  const [ error, setError ] = React.useState<string>(null);
  const   title_ref = React.useRef<HTMLTextAreaElement>();
  const content_ref = React.useRef<HTMLTextAreaElement>();
  const onCancel = () => {
    props.toggleEdit(false);
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
      props.toggleEdit(true);
    } else {
      setError(errors.join(""));
    }
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
