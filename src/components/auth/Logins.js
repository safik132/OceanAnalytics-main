import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_NODE } from "../../apiconfig";
/*
Login page rendered on the home page
*/
const Login = (props) => {
  const {
    form,
    setForm,
    Luser,
    setLUser,
    setUserData,
    error,
    setError,
  } = useContext(GlobalContext);
  let navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLUser({
      ...Luser,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: Luser.email,
      password: Luser.password,
      errors: {},
    };
    setError(null);
    setUserData(userData);
    if (userData.email === null || userData.email === "") {
      setError("Please enter a valid email address");
    } else if (userData.password === null || userData.password === "") {
      setError("Please enter Password");
    } else {
      axios
        .post(
          `${BASE_URL_NODE}/api/users/login`,
          userData
        )
        // .post("http://localhost:5001/users/login", userData)

        .then((res) => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          navigate("/sheet/sheet");
        })
        .catch((err) => {
          alert("Email or password invalid");
        });
    }
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
            Login
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
            value={Luser.email}
            id="email"
            type="email"
            placeholder="Email"
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={Luser.password}
            id="password"
            // error={errors.password}
            type="password"
            placeholder="Password"
          />

          <p style={{ color: "red" }}>
            {error && (
              <>
                <small>{error}</small>
              </>
            )}
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* <label style={{ fontSize: "13px" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
            </label> */}
            <p
              className="text_tag"
              onClick={(e) => setForm("forgotPassword")}
              style={{
                cursor: "pointer",
                backgroundColor: "#ffff",
                color: "#1A73E8",
                borderRadius: "8px",
                fontSize: "12px",
                padding: "3px",
                width: "200px",
                height: "30px",
                marginTop: "10px",
                marginLeft: "-0px",
              }}
            >
              Forgot Password?<br></br>
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
              Login
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button
              value="register"
              style={{
                cursor: "pointer",
                backgroundColor: "#ffff",
                color: "#1A73E8",
                border: "1px solid #1A73E8",
                borderRadius: "8px",
                fontSize: "12px",
                padding: "3px",
                width: "250px",
                height: "30px",
                marginTop: "25px",
                marginLeft: "40px",
              }}
              onClick={(e) => setForm(e.target.value)}
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
