import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
import "./App.css";
// import Login from "./Login";
import Login from "./components/auth/Logins";
import Register from "./components/auth/Register";
import Acealyze from "../src/images/Terraview.png";
import Otp from "./components/auth/Otp";
import ForgotPassword from "./components/auth/ForgotPassword";
const Home = () => {
  const { form, setForm } = useContext(GlobalContext);
  const navigate = useNavigate();
  async function directHandler(event) {
    event.preventDefault();
    navigate("./Sheet/sheet", { replace: true });
  }

  return (
    <>
      <div className="home-page">
        <div className="leftSide">
          <a href="http://www.aces-co.com/" rel="noreferrer" target="_blank">
            <img className="logo_logo" src={Acealyze} alt="logo-img" />
          </a>
          {form === "register" ? (
            <Register />
          ) : form === "forgotPassword" ? (
            <ForgotPassword />
          ) : form === "login" ? (
            <Login />
          ) : (
            <Login />
          )}
        </div>
        <div className="rightSide">{/* <Login /> */}</div>
      </div>
    </>
  );
};

export default Home;
