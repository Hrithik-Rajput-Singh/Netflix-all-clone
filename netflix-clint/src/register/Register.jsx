import React, { useRef, useState } from "react";
import "./Register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleUsername = () => {
    setUsername(usernameRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);

    try {
      await axios.post("auth/register", { email, username, password });
      history("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://images7.alphacoders.com/115/1152294.png"
            alt=""
          />
          <Link to={"/login"} className="loginButton">
            <span>Sign-in</span>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>unlimited Movies ,Tv Shows ,and more...</h1>
        <h2>watch anywhere . cancel anytime</h2>
        <p>
          Ready to watch ? Enter your email to create or restart your Membership
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="Registerbutton" onClick={handleStart}>
              Get started
            </button>
          </div>
        ) : !username ? (
          <div className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <button className="Registerbutton" onClick={handleUsername}>
              started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="password"
              placeholder="enter password"
              ref={passwordRef}
            />

            <button className="Registerbutton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
