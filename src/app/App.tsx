
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import AddCard from "./AddCard";
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

const CardRoute: React.SFC<{}> = () => {
  const { box_id, card_id } = useParams<{ box_id: string, card_id: string }>();
  const [ edit, setEdit ] = React.useState<boolean>(false);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className="Outer">
      <Header />
      <BoxFrame box_id={box_id}>
        { edit && <EditCard box_id={box_id} card_id={card_id} toggleEdit={toggleEdit} />}
        {!edit && <ShowCard box_id={box_id} card_id={card_id} toggleEdit={toggleEdit} />}
      </BoxFrame>
    </div>
  );
}

const AddCardRoute: React.SFC<{}> = () => {
  const { box_id } = useParams<{ box_id: string }>();
  return (
    <div className="Outer">
      <Header />
      <BoxFrame box_id={box_id}>
        <AddCard box_id={box_id} />
      </BoxFrame>
    </div>
  );
}

const DeleteCardRoute: React.SFC<{}> = () => {
  const { box_id, card_id } = useParams<{ box_id: string, card_id: string }>();
  return (
    <div className="Outer">
      <Header />
      <BoxFrame box_id={box_id}>
        <DeleteCard box_id={box_id} card_id={card_id} />
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
        <Route path="/addcard/:box_id">
          <AddCardRoute />
        </Route>
        <Route path="/card/:box_id/:card_id">
          <CardRoute />
        </Route>
        <Route path="/deletecard/:box_id/:card_id">
          <DeleteCardRoute />
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
