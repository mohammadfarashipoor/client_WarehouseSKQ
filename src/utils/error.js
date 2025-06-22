/**
 *
 * error.js
 * This is a generic error handler, it receives the error returned from the server and present it on a pop up
 */

import { toast } from "react-toastify";

import { signOut } from "../containers/Login/actions";

const handleError = (err, dispatch, title = "") => {
  const unsuccessfulOptions = {
    title: `${title}`,
    message: ``,
    position: "tr",
    autoDismiss: 1,
  };

  if (err.response) {
    if (err.response.status === 400) {
      unsuccessfulOptions.title = title ? title : "لطفا دوباره تلاش کنید";
      unsuccessfulOptions.message = err.response.data.error;
      toast.error(
        `${unsuccessfulOptions.title} ${unsuccessfulOptions.message}`
      );
    } else if (err.response.status === 404) {
      unsuccessfulOptions.title =
        err.response.data.message ||
        "درخواست شما با مشکلی مواجه شد. لطفا دوباره تلاش کنید.";
      toast.error(
        `${unsuccessfulOptions.title} ${unsuccessfulOptions.message}`
      );
    } else if (err.response.status === 401) {
      unsuccessfulOptions.message = "دسترسی غیرمجاز! لطفا دوباره وارد شوید";
      dispatch(signOut());
      toast.error(
        `${unsuccessfulOptions.title} ${unsuccessfulOptions.message}`
      );
    } else if (err.response.status === 403) {
      unsuccessfulOptions.message = " شما اجازه دسترسی به این منبع را ندارید.";
      toast.error(
        `${unsuccessfulOptions.title} ${unsuccessfulOptions.message}`
      );
    }
  } else if (err.message) {
    unsuccessfulOptions.message = err.message;
    toast.error(`${unsuccessfulOptions.title} ${unsuccessfulOptions.message}`);
  } else {
    // fallback
    unsuccessfulOptions.message =
      "درخواست شما با مشکلی مواجه شد. لطفا دوباره تلاش کنید.";
  }
};
export function isEmptyObject(obj) {
  if (obj == null) return true;
  return Object.keys(obj).length === 0;
}
export default handleError;
