/**
 *
 * Notification
 *
 */

import React from "react";

import { connect } from "react-redux";
import actions from "@/context/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Notification() {
  const style = {
    NotificationItem: {
      DefaultStyle: {
        margin: "10px 5px 2px 1px",
      },

      success: {
        color: "red",
      },
    },
  };
  return <ToastContainer />;
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps, actions)(Notification);
