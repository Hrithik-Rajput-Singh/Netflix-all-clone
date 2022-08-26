import {
  Add,
  PlayArrow,
  ThumbDownAltSharp,
  ThumbUpAltSharp,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./ListItem.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ item, index }) {
  const [ishover, setIsHover] = useState(false);
  const [movie, setMovie] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const respo = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA2MzVkNjcxNzRmNzJmNjgxZjdkNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTI2MzQyMSwiZXhwIjoxNjYxNjk1NDIxfQ.g3Sh2LQxqedfinBMbK6ELaFOvnbBKfyVJPyxCAeR1RQ",
          },
        });

        setMovie(respo.data);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [item]);

  return (
    //index style we are telling when we hover it the 225 which is width of item * hoverIndex - 50(-50 because in scss ishover width become 325 )
    //2.5 here is gap between each list item
    <>
      {loaded ? (
        <Link to="/watch" state={{ fromDashboard: movie }}>
          {/* above we are saying link to send object ((thrugh state))which we can access in /watch by using location hook*/}
          <div
            className="item"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            style={{ left: ishover && index * 225 - 50 + index * 2.5 }}
          >
            <img src={movie.img} alt="" />
            {ishover && (
              <>
                <video src={movie.trailer} autoPlay={true} loop />
                <div className="itemInfo">
                  <div className="icons">
                    <PlayArrow className="icon" />
                    <Add className="icon" />
                    <ThumbUpAltSharp className="icon" />
                    <ThumbDownAltSharp className="icon" />
                  </div>
                  <div className="itemInfoTop">
                    {/* <span>1 hour 15mins</span> */}
                    <span className="limit">{movie.limit}</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className="desc">{movie.desc}</div>
                  <div className="genre">{movie.genre}</div>
                </div>
              </>
            )}
          </div>
        </Link>
      ) : (
        <div>Fetching please wait ....</div>
      )}
    </>
  );
}
