/**
 *
 * Notification
 *
 */

import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Notification() {
  return (
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}
    />
  );
}

export default Notification;
