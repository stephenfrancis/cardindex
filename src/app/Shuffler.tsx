
import * as React from "react";
import Data from "../model/Data";
import ShowCard from "./ShowCard";

interface Props {
  start_at_index: number;
}

const Shuffler: React.SFC<Props> = (props) => {
  const total_cards = Data.getCardCount();
  const [ curr_card, setCurrCard ] = React.useState<number>(Math.min(total_cards, props.start_at_index));
  React.useEffect(() => {
    setCurrCard(Math.min(total_cards, props.start_at_index));
  });

  let touch_y_posn: number;
  const prevCard = () => {
    if (curr_card > 0) {
      setCurrCard(curr_card - 1);
    }
  };
  const nextCard = () => {
    if (curr_card < (total_cards - 1)) { // down
      setCurrCard(curr_card + 1);
    }
  };
  const onKeyUp = (event: React.KeyboardEvent) => {
    console.log(`onKeyUp: ${event.keyCode}`);
    if (event.keyCode === 38) {
      prevCard();
    } else if (event.keyCode === 40) {
      nextCard();
    }
  };
  const onTouchStart = (event: React.TouchEvent) => {
    touch_y_posn = event.touches[0].clientY;
  };
  const onTouchMove = (event: React.TouchEvent) => {
    if ((event.changedTouches[0].clientY + 5) > touch_y_posn) { // up
      console.log(`dragging down - earlier card`);
      prevCard();
    } else {
      console.log(`dragging up later card`);
      nextCard();
    }
  };
  return (
    <div
        className="Shuffler"
        draggable={true}
        onKeyUp={onKeyUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchMove}
    >
      <div className="PadTop"></div>
      {((curr_card >= 2) && <ShowCard card={Data.getCard(curr_card - 2)} />)}
      {((curr_card >= 1) && <ShowCard card={Data.getCard(curr_card - 1)} />)}
      <ShowCard mode="main" card={Data.getCard(curr_card)} />
      {((curr_card < (total_cards - 1)) && <ShowCard card={Data.getCard(curr_card + 1)} />)}
      {((curr_card < (total_cards - 2)) && <ShowCard card={Data.getCard(curr_card + 2)} />)}
    </div>
  );
};

export default Shuffler;
