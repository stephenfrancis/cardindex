
import * as React from "react";
import * as ReactDOM from "react-dom";
import Card from "./Card";
import Data from "./Data";
import FirstLetterIndex from "./FirstLetterIndex";
import Shuffler from "./Shuffler";
import test_data from "./test_data.json";

test_data.forEach((text) => {
  Data.addCard(new Card(text, "More info about " + text));
});

interface Props {}

const App: React.SFC<Props> = (props) => {
  return (
    <div>
      <FirstLetterIndex />
      <Shuffler />
    </div>
  );
};

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
