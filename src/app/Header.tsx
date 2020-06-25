
import * as React from "react";
import { Link } from "react-router-dom";


const Header: React.SFC<{}> = () => {
  return (
    <div className="Header">
      <Link to="/home">CardIndex</Link>
    </div>
  );
};

export default Header;
