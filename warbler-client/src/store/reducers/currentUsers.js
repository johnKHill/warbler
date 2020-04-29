import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false, // hopefully will be true, when user has logged in
  user: {} // all the users info when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // turns an empty object into false or if there are keys, to true - boolean !!notnot
        isAuthenticated: !!Object.keys(action.user).length, // are there keys or no keys
        user: action.user
      };
      default:
        return state
  }
}