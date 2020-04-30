import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}))
  }
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap the thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());  // if there are previous errors, dispatch
          resolve(); // Indicates that the API call succeeded
        })
        .catch(err => {
          // if there are errors that get created, dispatch
          dispatch(addError(err.message));
          reject();  // Indicates the API call failed
        });
    });
  };
}