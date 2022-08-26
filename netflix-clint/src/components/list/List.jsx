import {
  ArrowBackIosRounded,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
import ListItem from "../com/ListItem";
import "./List.scss";

export default function List({ list }) {
  let listRef = useRef();
  const [sliderNumber, setSliderNumber] = useState(0);
  const [moved, setMoved] = useState(false);

  //to select particular listitem we use list ref
  //we will change here style now by using transform
  //traanslate x work as row and here 230 because we want one whole list item to move left
  //after translateX230 we notice it moving 230 but by clicking again it remain same 230 so here what we need to do is add previous 230 to new 230
  //and  to do that  we will use getBoundingClietRect (these will tell us the exect postion we moved by clicking) we can then add these with current ref .
  //console.log(distance) x = 280 y -1300 //it is catching whole from 0 point so we will less 50 px here
  //slidernumber to tell when we can move and we canot
  const handleClick = (direction) => {
    setMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && sliderNumber > 0) {
      setSliderNumber(sliderNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    } else if (direction === "right" && sliderNumber <= 5) {
      setSliderNumber(sliderNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    //these whole is a slider list view
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosRounded
          className="siderArrow left"
          onClick={() => {
            handleClick("left");
          }}
          style={{ display: !moved && "none" }}
        />
        <div className="container" ref={listRef}>
          {/* specifice list .. we have to fetch all movies by is here*/}
          {list.content.map((lId, i) => (
            <ListItem item={lId} index={i} key={i} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="siderArrow right"
          onClick={() => {
            handleClick("right");
          }}
        />
      </div>
    </div>
  );
}
