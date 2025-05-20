/*
 *
 * reducers.js
 * reducers configuration
 */

import { combineReducers } from "redux";
// import reducers

import signupReducer from "@/containers/Register/reducer";
import loginReducer from "@/containers/Login/reducer";

const createReducer = () =>
  combineReducers({
    signup: signupReducer,
    login: loginReducer,
  });

export default createReducer;
