import { ArrowBackIosOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Watch.scss";

function Watch() {
  const location = useLocation();
  const movie = location.state.fromDashboard;
  return (
    <div className="watch">
      <Link to={"/"}>
        <div className="back">
          <ArrowBackIosOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}

export default Watch;
