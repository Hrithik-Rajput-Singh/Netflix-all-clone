import React, { useEffect, useState } from "react";
import Feature from "../components/feature/Feature";
import List from "../components/list/List";
import Navbar from "../components/navbar/Navbar";
import "./Home.scss";
const axios = require("axios");

function Home({ type }) {
  const [listItem, setListItem] = useState([]);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const getList = async () => {
      //we dont have to use http://localhost:8800/backend/       bcus we have proxy already in a packege json file
      //here we are saying these in axios get method = lists?type=movies&genre=comedy
      //${type ? "?type=" + type : ""}
      //After that we are setting verify JWT METHOD
      try {
        const respo = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genres !== null ? "&genre=" + genres : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA2MzVkNjcxNzRmNzJmNjgxZjdkNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTI2MzQyMSwiZXhwIjoxNjYxNjk1NDIxfQ.g3Sh2LQxqedfinBMbK6ELaFOvnbBKfyVJPyxCAeR1RQ",
            },
          }
        );

        setListItem(respo.data);
      } catch (err) {
        console.log(err);
      }
    };

    getList();
  }, [type, genres]);

  return (
    <div className="home">
      <Navbar />
      <Feature type={type} setGenres={setGenres} />
      {listItem.map((l, index) => (
        <List list={l} key={index} />
      ))}
    </div>
  );
}

export default Home;
