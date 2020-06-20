
import * as React from "react";
import FirstLetterIndex from "./FirstLetterIndex";

interface Props {
  setStartAt: (start_at: number) => void;
}

const Header: React.SFC<Props> = (props) => {
  return (
    <div className="Header">
      <div>CardIndex</div>
      <FirstLetterIndex setStartAt={props.setStartAt} />
    </div>
  );
};

export default Header;
