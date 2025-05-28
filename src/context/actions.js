/**
 *
 * actions.js
 * actions configuration
 */

import { bindActionCreators } from "redux";

import * as signup from "@/containers/Register/actions";
import * as login from "@/containers/Login/actions";
import * as authentication from "@/containers/Authentication/actions";
import * as employee from "@/containers/EmployeeList/actions";
import * as customer from "@/containers/CustomersList/actions";

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authentication,
      ...signup,
      ...login,
      ...employee,
      ...customer
    },
    dispatch
  );
}
