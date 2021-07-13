import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import BoxFrame from "./BoxFrame";
import DeleteCard from "./DeleteCard";
import EditCard from "./EditCard";
import FirstLetterIndex from "./FirstLetterIndex";
import Header from "./Header";
import Home from "./Home";
import * as Mock from "../model/Mock";
import ShowCard from "./ShowCard";
import Shuffler from "./Shuffler";

import "../public/main.css";
import styles from "./Outer.css";

Mock.ensureAtLeastOneBoxPresent();

const BoxRoute: React.FC<{}> = () => {
  const { box_id } = useParams<{ box_id: string }>();
  return (
    <div className={styles.Outer}>
      <Header />
      <BoxFrame box_id={box_id}>
        <FirstLetterIndex box_id={box_id} />
        <Shuffler box_id={box_id} />
      </BoxFrame>
    </div>
  );
};

const BoxIdRoute: React.FC<{ child: React.FC<{ box_id: string }> }> = (
  props
) => {
  const { box_id } = useParams<{ box_id: string }>();
  return (
    <div className={styles.Outer}>
      <Header />
      <BoxFrame box_id={box_id}>
        <props.child box_id={box_id} />
      </BoxFrame>
    </div>
  );
};

const BoxIdCardIdRoute: React.FC<{
  child: React.FC<{ box_id: string; card_id: string }>;
}> = (props) => {
  const { box_id, card_id } = useParams<{ box_id: string; card_id: string }>();
  return (
    <div className={styles.Outer}>
      <Header />
      <BoxFrame box_id={box_id}>
        <props.child box_id={box_id} card_id={card_id} />
      </BoxFrame>
    </div>
  );
};

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/box/:box_id">
          <BoxRoute />
        </Route>
        <Route path="/card/:box_id/add">
          <BoxIdRoute child={EditCard} />
        </Route>
        <Route path="/card/:box_id/:card_id/delete">
          <BoxIdCardIdRoute child={DeleteCard} />
        </Route>
        <Route path="/card/:box_id/:card_id/edit">
          <BoxIdCardIdRoute child={EditCard} />
        </Route>
        <Route path="/card/:box_id/:card_id">
          <BoxIdCardIdRoute child={ShowCard} />
        </Route>
        <Route>
          <div className={styles.Outer}>
            <Header />
            <Home />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
