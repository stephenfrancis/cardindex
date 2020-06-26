
import * as React from "react";
import { Link } from "react-router-dom";
import All from "../model/All";
import Box from "../model/Box";


const Home: React.SFC<{}> = () => {
  const children = [];
  All.forEachBox((box: Box, box_id: string) => {
    children.push(<div key={box_id}>
      <Link to={`/box/${box_id}`}>{box.getTitle()}</Link>
    </div>);
  });
  return (
    <div className="Home">
      <h2>Current Boxes</h2>
      {children}
    </div>
  );
}

export default Home;
