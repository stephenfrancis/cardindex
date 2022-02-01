import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import AddBox from "./AddBox";
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

const NullRoute: React.FC<{ child: React.FC<{}> }> = (props) => {
  return (
    <div className={styles.Outer}>
      <Header />
      <props.child />
    </div>
  );
};

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

const HomeRoute: React.FC = () => {
  console.log(`inside HomeRoute`);
  return (
    <div className={styles.Outer}>
      <Header />
      <Home />
    </div>
  );
};

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addbox" element={<NullRoute child={AddBox} />} />
        <Route path="/box/:box_id" element={<BoxRoute />} />
        <Route
          path="/card/:box_id/add"
          element={<BoxIdRoute child={EditCard} />}
        />
        <Route
          path="/card/:box_id/:card_id/delete"
          element={<BoxIdCardIdRoute child={DeleteCard} />}
        />
        <Route
          path="/card/:box_id/:card_id/edit"
          element={<BoxIdCardIdRoute child={EditCard} />}
        />
        <Route
          path="/card/:box_id/:card_id"
          element={<BoxIdCardIdRoute child={ShowCard} />}
        />
        <Route path="*" element={<HomeRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
