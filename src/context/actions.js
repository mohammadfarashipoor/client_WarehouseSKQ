/**
 *
 * actions.js
 * actions configuration
 */

import { bindActionCreators } from "redux";

import * as signup from "@/containers/Register/actions";
import * as login from "@/containers/Login/actions";
import * as authentication from "@/containers/Authentication/actions";

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authentication,
      ...signup,
      ...login,
    },
    dispatch
  );
}
