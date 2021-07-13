import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.css";

const Header: React.FC<{}> = () => {
  return (
    <div className={styles.Header}>
      <Link to="/home">CardIndex</Link>
    </div>
  );
};

export default Header;
