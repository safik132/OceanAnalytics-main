import React, { useContext, useState, useRef } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { Link, withRouter, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { BASE_URL_NODE } from "../../apiconfig";
/* to register user */
const Register = (userData) => {
  const navigate = useNavigate();

  const {
    setForm,
    error,
    setError,
    setRegisterOTP,
    user,
    setUser,
  } = useContext(GlobalContext);
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   password2: "",
  // });
  const email = useRef();
  let randOtp = "";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2,
      // Role:user.Role,
      Role: "premium", //disabled user for test case do not remove this
    };

    setUser(newUser);
    var x = document.getElementById("verifyOTP");
    const len = 5;
    for (let i = 0; i < len; i++) {
      const ch = Math.floor(Math.random() * 10 + 1);
      randOtp += ch;
    }
    setRegisterOTP(randOtp);
    axios
      // .post("http://localhost:5001/api/users/checkemail", user)
      .post(
        `${BASE_URL_NODE}/api/users/checkemail`,
        user
      )
      .then((res) => {
        if (res.data.email === "new user") {
          if (newUser.password === newUser.password2) {
            emailjs
              .send(
                "service_d47neib",
                "template_0hhy8lm",
                {
                  email: newUser.email,
                  code: randOtp,
                },
                "cDFiq8UMCJuSB535H"
              )
              .then(
                (result) => {
                  navigate("/Otp");
                  setError("");
                },
                (error) => {
                  console.log(error.text);
                }
              );
          } else {
            setError("Passwords didn't match");
          }
        } else {
          setError(res.data.email);
        }
      });
  };
  return (
    <>
      <div className="LoginPage">
        <div className="">
          <h4
            style={{
              marginLeft: "-165px",
              fontWeight: "500",
            }}
          >
            Register
          </h4>
        </div>
        <p
          style={{
            width: "10%",
            height: "3.25px",
            marginLeft: "-285px",
            marginTop: "5px",
            border: "1px solid #E50035",
            backgroundColor: "#E50035",
          }}
        ></p>
        <form className="LoginForm" onSubmit={handleSubmit}>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.name}
            id="name"
            type="name"
            placeholder="Name"
            required
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.email}
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.password}
            id="password"
            required
            type="password"
            placeholder="Password"
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.password2}
            id="password2"
            // error={errors.password}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <br></br>
          <select
            className="formInput"
            style={{
              fontSize: "15px",
              padding: "8px 0 8px 0 ",
              height: "38px",
              display: "none",
            }}
            onChange={handleChange}
            id="Role"
          >
            <option value="">Role</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>

          <br></br>
          <p>
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
              </>
            )}
          </p>
          <div
            style={{
              display: "flex",
              cursor: "pointer",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p style={{ width: "auto", fontSize: "13px" }}>
              Already have a account?<br></br>
              <p
                style={{ fontSize: "13px", color: "#1A73E8" }}
                onClick={() => setForm("login")}
              >
                Login
              </p>
            </p>
            <button
              className="formBtn"
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#1A73E8",
                color: "white",
                fontWeight: "400",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
