import Home from "./Home/Home";
import "./App.scss";
import Register from "./register/Register";
import Login from "./login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Watch from "./watch/Watch";
import { TrendingUpRounded } from "@material-ui/icons";
import { AuthContext } from "../src/authContext/AuthContext";
import { useContext } from "react";

function App() {
  let { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          exact
          path="/register"
          element={!user ? <Register /> : <Home />}
        />
        <Route exact path="/login" element={!user ? <Login /> : <Home />} />
      </Routes>

      {user && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" exact element={<Watch />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
