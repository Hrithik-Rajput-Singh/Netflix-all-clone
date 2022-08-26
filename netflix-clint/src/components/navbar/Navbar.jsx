import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/apiCalls";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  //window scroll tell us that whether page is scrolling or not
  window.onscroll = () => {
    //window pageYoOffSet tells about page been scrolledin a numeric vlue
    setScrolling(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const { dispatch } = useContext(AuthContext);

  return (
    <div className={scrolling ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="https://www.seekpng.com/png/small/198-1984555_netflix-and-chill-png-picture-transparent-download-netflix.png" />
          <Link to={"/"} className="link">
            <span>Home</span>
          </Link>
          <Link to={"/series"} className="link">
            <span className="includeInMt">Series</span>
          </Link>
          <Link to={"/movies"} className="link">
            <span className="includeInMt">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>MyList</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>search</span>
          <Notifications className="icon" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9z-YK4Ep9SGuFmwBDw_kptagP_DkwuZFW5Z-RryL0&s" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>setting</span>
              <span>profile</span>
              <span
                onClick={() => {
                  dispatch(logout);
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
