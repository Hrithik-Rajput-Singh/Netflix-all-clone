import "./login.css";
import React, { useState, useContext } from "react";
import { login } from "../context/authContext/apiCalls";
import { AuthContext } from "../context/authContext/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("these is working");
    login({ email, password }, dispatch); //login from apiCall /auth
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
          <form>
            <div className="input-container">
              <label>Username/Email </label>
              <input
                type="text"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                type="password"
                name="password"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button
              className="button-container"
              onClick={handleSubmit}
              disabled={isFetching}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
