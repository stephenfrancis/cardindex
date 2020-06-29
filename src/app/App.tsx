
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
import ShufflerAlt from "./ShufflerAlt";


Mock.ensureAtLeastOneBoxPresent();


const BoxRoute: React.SFC<{}> = () => {
  const { box_id } = useParams<{ box_id: string }>();
  return (
    <div className="Outer">
      <Header />
      <BoxFrame box_id={box_id}>
        <FirstLetterIndex box_id={box_id} />
        <ShufflerAlt box_id={box_id} />
      </BoxFrame>
    </div>
  );
}

const BoxIdRoute: React.SFC<{ child: React.SFC<{ box_id: string }> }> = (props) => {
  const { box_id } = useParams<{ box_id: string }>();
  return (
    <div className="Outer">
      <Header />
      <BoxFrame box_id={box_id}>
        <props.child box_id={box_id} />
      </BoxFrame>
    </div>
  );
}

const BoxIdCardIdRoute: React.SFC<{ child: React.SFC<{ box_id: string, card_id: string }> }> = (props) => {
  const { box_id, card_id } = useParams<{ box_id: string, card_id: string }>();
  return (
    <div className="Outer">
      <Header />
      <BoxFrame box_id={box_id}>
        <props.child box_id={box_id} card_id={card_id} />
      </BoxFrame>
    </div>
  );
}


const App: React.SFC<{}> = () => {
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
          <div className="Outer">
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
