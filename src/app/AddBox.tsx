import * as React from "react";
import { Redirect } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";

import stylesAddBox from "./AddBox.css";
import stylesButtons from "./Buttons.css";
import stylesError from "./Error.css";

interface Props {}

const AddBox: React.FC<Props> = (props) => {
  const [redir, setRedir] = React.useState<string>(null);
  const [error, setError] = React.useState<string>(null);
  const title_ref = React.useRef<HTMLInputElement>();
  const onCancel = () => {
    setRedir("/");
  };
  const onSave = () => {
    const box: Box = All.addBox();
    let errors = [];
    try {
      box.setTitle(title_ref.current.value);
    } catch (e) {
      errors.push(`The title you entered is invalid because it ${e.message}. `);
    }
    if (errors.length === 0) {
      setError(null);
      setRedir(`/box/${box.getBoxId()}`);
    } else {
      setError(errors.join(""));
    }
  };
  if (redir) {
    return <Redirect to={redir} />;
  }
  return (
    <div className={stylesAddBox.AddBox}>
      <div className={stylesError.Error}>{error || ""}</div>
      <input ref={title_ref} defaultValue={""} />
      <div className={stylesButtons.Buttons}>
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddBox;
