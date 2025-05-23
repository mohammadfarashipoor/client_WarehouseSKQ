/**
 *
 * Authentication
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Navigate } from "react-router";
import actions from "@/context/actions";

function Authentication(ComposedComponent) {
  return function WrappedComponent(props) {
    const { authenticated } = props;
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return <ComposedComponent {...props} />;
  };
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(Authentication);
