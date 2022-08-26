import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Feature.scss";
import axios from "axios";

function Feature({ type, setGenres }) {
  const [data, setData] = useState({});

  useEffect(() => {
    //here we will use get("movies/random")
    const getRandom = async () => {
      const respo = await axios.get(`/movies/random?type=${type}`, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA2MzVkNjcxNzRmNzJmNjgxZjdkNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTAwNzY3MywiZXhwIjoxNjYxNDM5NjczfQ.up2uwCb7145JCO1jrGI8wS9fXB-RHgnA6J0210NaKLc",
        },
      });

      setData(respo.data[0]);
    };
    getRandom();
  }, [type]);

  return (
    <div className="feature">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movie" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenres(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">adventure</option>
            <option value="comedy">comedy</option>
            <option value="horror">horror</option>
            <option value="crime">crime</option>
            <option value="fantasy">fantasy</option>
            <option value="historical">historical</option>
            <option value="sci-fi">sci-fi</option>
            <option value="drama">drama</option>
            <option value="documentry">documentry</option>
            <option value="thriller">thriller</option>
          </select>
        </div>
      )}
      <img src={data.img} alt="" />
      <div className="infos">
        <img src={data.imgTitle} alt="" />
        <span className="sp">{data.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info!</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feature;
