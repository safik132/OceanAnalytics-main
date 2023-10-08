import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import Acealyze from "../../images/Acealyze.png";

/*
This page is the otp verification page for user registration when the user enter details its gonna popup to this page 
to verify one time password.
*/

const Otp = (props) => {
  const { error, user, setUser, setError, registerOTP } = useContext(
    GlobalContext
  );
  let navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState();

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleSubmitOtp = (e) => {
    if (registerOTP === otp) {
      axios
        // .post("http://localhost:5001/api/users/register", user)
        .post(
          "https://ocean-user-serverbackend.onrender.com/api/users/register",
          user
        )
        .then((res) => {
          alert("Registered Successfully pls login");
          setError("");
          if (alert) {
            setUser({
              name: "",
              email: "",
              password: "",
              password2: "",
              Role: "",
            });
          }
          navigate("/");
        })
        .catch((res) => {
          setError(res.response.data.email);
        });
    } else {
      setError("Otp didn't match");
    }
  };
  return (
    <>
      <div className="home-page">
        <div className="OtpLeftSide">
          <a href="https://www.aces-co.com/" rel="noreferrer" target="_blank">
            <img className="logo" src={Acealyze} alt="logo-img" />
          </a>
        </div>
        <div className="OtpRightSide">
          <div className="OtpPage">
            <div className="">
              <h4 style={{ marginLeft: "-160px" }}>
                <b>Otp</b>
              </h4>
            </div>
            <p
              style={{
                width: "4.5%",
                height: "3.25px",
                marginLeft: "-297px",
                marginTop: "5px",
                border: "1px solid #E50035",
                backgroundColor: "#E50035",
              }}
            ></p>
            <div className="">
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  marginTop: "20px",
                  fontSize: "10px",
                }}
              >
                We have send you a One Time Password(OTP) to your email
              </p>
              <br></br>
              <input onChange={(e) => setOtp(e.target.value)} />
            </div>
            <p>
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                </>
              )}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button
                className="formBtn"
                style={{
                  width: "120px",
                  height: "40px",
                  backgroundColor: "#1A73E8",
                  color: "white",
                  fontWeight: "400",
                }}
                onClick={handleSubmitOtp}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Otp;
