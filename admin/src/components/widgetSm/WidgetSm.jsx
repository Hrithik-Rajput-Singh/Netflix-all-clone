import "./widgetSm.css";
import React, { useEffect, useState } from "react";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const respo = await axios("/users?new=true", {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA2MzVkNjcxNzRmNzJmNjgxZjdkNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTAwNzY3MywiZXhwIjoxNjYxNDM5NjczfQ.up2uwCb7145JCO1jrGI8wS9fXB-RHgnA6J0210NaKLc",
        },
      });

      setUserData(respo.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      {userData.map((user, index) => (
        <ul className="widgetSmList" key={index}>
          <li className="widgetSmListItem">
            <img
              src={
                user.profilePic ||
                "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>

            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
