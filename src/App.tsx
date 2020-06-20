
import * as React from "react";
import * as ReactDOM from "react-dom";
import Card from "./Card";
import Data from "./Data";
import Header from "./Header";
import Shuffler from "./Shuffler";
import test_data from "./test_data.json";

test_data.forEach((item) => {
  Data.addCard(new Card(item.title, item.content));
});
Data.sort();

interface Props {}

const App: React.SFC<Props> = (props) => {
  const total_cards = Data.getCardCount();
  const [ start_at, setStartAt ] = React.useState<number>(Math.min(total_cards, 2));
  return (
    <div>
      <Header setStartAt={setStartAt} />
      <Shuffler start_at_index={start_at} />
    </div>
  );
};

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
