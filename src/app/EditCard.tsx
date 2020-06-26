
import * as React from "react";
import All from "../model/All";
import Box from "../model/Box";
import Card from "../model/Card";

interface Props {
  box_id: string;
  card_id: string;
  toggleEdit: () => void;
}

const EditCard: React.SFC<Props> = (props) => {
  const box : Box  = All.getBox(props.box_id);
  const card: Card = box.getCard(props.card_id);
  const [ error, setError ] = React.useState<string>(null);
  const   title_ref = React.useRef<HTMLInputElement>();
  const content_ref = React.useRef<HTMLTextAreaElement>();
  const onCancel = () => {
    props.toggleEdit();
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
      props.toggleEdit();
    } else {
      setError(errors.join(""));
    }
  }
  return (
    <div>
      <div className="EditCard">
        <div className="Error">{error || ""}</div>
        <div>
          <input ref={title_ref} type="text" defaultValue={card.getTitle()} />
        </div>
        <div>
          <textarea ref={content_ref} defaultValue={card.getContent()} />
        </div>
      </div>
      <div className="Buttons">
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCard;
