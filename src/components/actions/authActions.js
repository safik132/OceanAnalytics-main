import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { setAuthenticated, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (userData, history) => {
  axios
    // .post("http://localhost:5001/api/users/register", userData)
    .post(
      "https://ocean-user-serverbackend.onrender.com/api/users/register",
      userData
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  setCurrentUser({});
};
