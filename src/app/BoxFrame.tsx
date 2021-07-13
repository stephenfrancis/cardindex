import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";

import styles from "./Box.css";

interface Props {
  box_id: string;
}

const BoxTitleShow: React.FC<{
  title: string;
  toggleEdit: () => void;
  box_id: string;
}> = (props) => {
  return (
    <div>
      <Link to={`/box/${props.box_id}`}>Box: {props.title}</Link>
      <button onClick={props.toggleEdit}>Edit</button>
    </div>
  );
};

const BoxTitleEdit: React.FC<{
  title: string;
  toggleEdit: () => void;
  box: Box;
}> = (props) => {
  const title_ref = React.useRef<HTMLInputElement>();
  const onCancel = () => {
    props.toggleEdit();
  };
  const onSave = () => {
    props.box.setTitle(title_ref.current.value);
    props.toggleEdit();
  };
  return (
    <div>
      <input type="text" ref={title_ref} defaultValue={props.title} />
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

const BoxFrame: React.FC<Props> = (props) => {
  const box: Box = All.getBox(props.box_id);
  const [edit, setEdit] = React.useState<boolean>(false);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className={styles.Box}>
      {edit && (
        <BoxTitleEdit
          title={box.getTitle()}
          toggleEdit={toggleEdit}
          box={box}
        />
      )}
      {!edit && (
        <BoxTitleShow
          title={box.getTitle()}
          toggleEdit={toggleEdit}
          box_id={props.box_id}
        />
      )}
      {props.children}
    </div>
  );
};

export default BoxFrame;
