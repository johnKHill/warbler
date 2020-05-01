import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

// actionCreators
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}


// "Thunks" to dispatch the actionCreators
export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
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
          setAuthorizationToken(token);
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