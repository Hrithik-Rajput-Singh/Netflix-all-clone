import React, { useContext, useRef, useState } from "react";
import { login } from "../authContext/apiCalls";
import { AuthContext } from "../authContext/AuthContext";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://images7.alphacoders.com/115/1152294.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email and pasword"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleSubmit}>
            Sign In
          </button>
          <span>
            New to Netflix ? <b>Sign Up</b>
          </span>
          <small>
            This page is protected by google capache to make sure your not a bot
          </small>
        </form>
      </div>
    </div>
  );
}
