/*
 *
 * reducers.js
 * reducers configuration
 */

import { combineReducers } from "redux";
// import reducers

import signupReducer from "@/containers/Register/reducer";
import loginReducer from "@/containers/Login/reducer";
import authenticationReducer from "@/containers/Authentication/reducer";

const createReducer = () =>
  combineReducers({
    authentication: authenticationReducer,
    signup: signupReducer,
    login: loginReducer,
  });

export default createReducer;
