import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

// ActionCreators for Errors - functions that return actions
export const addError = error => ({
  type: ADD_ERROR,
  error
});


export const removeError = () => ({
  type: REMOVE_ERROR,
});