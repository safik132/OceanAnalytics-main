import React, { useRef, useState, useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/*
Forgot password is the component to change password for the existing user,
this page is rendered from the login page option that is forgot password.
*/
export default function ForgotPassword() {
  const { error, setError, setForm } = useContext(GlobalContext);
  const [otp, setOtp] = useState();
  const [cnfOtp, setcnfOtp] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setconfirmPassword] = useState();
  const [email, setEmail] = useState();
  const form = useRef();
  let randomOTP = "";
  let navigate = useNavigate();
  function SendOTP(e) {
    e.preventDefault();
    const len = 5;
    for (let i = 0; i < len; i++) {
      const ch = Math.floor(Math.random() * 10 + 1);
      randomOTP += ch;
    }
    setOtp(randomOTP);
    const Dataemail = {
      email: email,
      // otp: randomOTP,
    };
    var x = document.getElementById("changePassword");

    axios
      // .post("http://localhost:5001/api/users/forgotPassword", Dataemail)
      .post(
        "https://ocean-user-serverbackend.onrender.com/api/users/forgotPassword",
        Dataemail
      )
      .then((res) => {
        setError(res.data.email);
        setUser(res.data.user);
        if (res.data.email === "Otp Send Succesfully") {
          emailjs
            .send(
              "service_pdderjs",
              "template_1oyoa7d",
              {
                email: email,
                code: randomOTP,
              },
              "cDFiq8UMCJuSB535H"
            )
            .then(
              (result) => {
                if (x.style.display === "none") {
                  x.style.display = "flex";
                } else {
                  x.style.display = "none";
                }
              },
              (error) => {
                console.log(error.text);
              }
            );
        }
      });
  }
  const handleChange = (e) => {
    const updatePwd = {
      email: user.email,
      password: password,
      confirmpassword: confirmpassword,
    };
    if (cnfOtp != otp) {
      setError("Incorrect Otp");
    } else if (password != confirmpassword) {
      setError("passwords didn't match");
    } else {
      axios
        // .post("http://localhost:5001/api/users/updatePassword", updatePwd)
        .post(
          "https://ocean-user-serverbackend.onrender.com/api/users/updatePassword",
          updatePwd
        )
        .then((res) => {
          alert("Password changed succesfully");
          navigate("/");
          setForm("");
          setError("");
        });
    }
  };
  return (
    <div className="LoginPage">
      <div className="">
        <h4
          style={{
            marginLeft: "-165px",
            fontWeight: "500",
          }}
        >
          Reset Password
        </h4>
      </div>
      <p
        style={{
          width: "20%",
          height: "3.25px",
          marginLeft: "-225px",
          marginTop: "5px",
          border: "1px solid #E50035",
          backgroundColor: "#E50035",
        }}
      ></p>
      <form ref={form} className="LoginForm" onSubmit={SendOTP}>
        <label>Email</label>
        <input
          type="email"
          className="formInput"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <p style={{ color: "red" }}>
          {error && (
            <>
              <small>{error}</small>
            </>
          )}
        </p>
        <input
          type="number"
          value={otp}
          name="code"
          style={{ display: "none" }}
        />

        <button
          type="submit"
          value="Send"
          className="formBtn"
          style={{
            width: "120px",
            height: "40px",
            backgroundColor: "#1A73E8",
            color: "white",
            fontWeight: "400",
            marginLeft: "250px",
            marginTop: "20px",
          }}
        >
          Send OTP
        </button>
      </form>
      <div
        id="changePassword"
        style={{ display: "none", flexDirection: "column", margin: "0px" }}
        className="LoginForm"
      >
        <input
          type="number"
          className="formInput"
          placeholder="Enter OTP"
          onChange={(e) => setcnfOtp(e.target.value)}
        />
        <br></br>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="formInput"
          type="password"
          placeholder="Password"
        />
        <br></br>
        <input
          onChange={(e) => setconfirmPassword(e.target.value)}
          className="formInput"
          type="password"
          placeholder="Confirm Password"
        />
        <br></br>
        <input
          type="submit"
          onClick={handleChange}
          style={{
            width: "120px",
            height: "40px",
            backgroundColor: "#1A73E8",
            color: "white",
            fontWeight: "400",
            marginLeft: "250px",
            marginTop: "10px",
          }}
          className="formBtn"
        />
      </div>
    </div>
  );
}
