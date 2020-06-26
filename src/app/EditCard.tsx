
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
  const   title_ref = React.useRef<HTMLInputElement>();
  const content_ref = React.useRef<HTMLTextAreaElement>();
  const onCancel = () => {
    props.toggleEdit();
  };
  const onSave = () => {
    card.setTitle(title_ref.current.value);
    card.setContent(content_ref.current.value);
    props.toggleEdit();
  }
  return (
    <div>
      <div className="EditCard">
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
