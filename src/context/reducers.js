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
import ReportEmpolyeesReducer from "@/containers/ReportEmpolyees/reducer";
import employeeReducer from "@/containers/EmployeeList/reducer";
import customerReducer from "@/containers/CustomersList/reducer";
import profileSettingReducer from "@/containers/ProfileSetting/reducer";
import eventReminderReducer from "@/containers/EventReminder/reducer";
import notificationsReducer from "@/containers/Notification/reducer";

const createReducer = () =>
  combineReducers({
    authentication: authenticationReducer,
    signup: signupReducer,
    login: loginReducer,
    employee: employeeReducer,
    reportEmployees: ReportEmpolyeesReducer,
    customer: customerReducer,
    profileSetting: profileSettingReducer,
    event: eventReminderReducer,
    notification:notificationsReducer
  });

export default createReducer;
