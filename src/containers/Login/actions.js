/*
 *
 * Login actions
 *
 */

// import { toast } from "react-toastify";
// import axios from "axios";
import history from "@/context/history";
import { navigateTo } from "../../context/navigationActions";

// import {
//   LOGIN_CHANGE,
//   LOGIN_RESET,
//   SET_LOGIN_LOADING,
//   SET_LOGIN_FORM_ERRORS,
//   SET_LOGIN_SUBMITTING,
// } from "./constants";
// import { setAuth, clearAuth } from "../Authentication/actions";
// import setToken from "../../utils/token";
// import handleError from "../../utils/error";
// import { clearAccount } from "../Account/actions";
// import { allFieldsValidation } from "../../utils/validation";

// export const loginChange = (name, value) => {
//   let formData = {};
//   formData[name] = value;

//   return {
//     type: LOGIN_CHANGE,
//     payload: formData,
//   };
// };

// export const login = () => {
//   return async (dispatch, getState) => {
//     const rules = {
//       email: "required|email",
//       password: "required|min:6",
//     };

//     const user = getState().login.loginFormData;

//     const { isValid, errors } = allFieldsValidation(user, rules, {
//       "required.email": "ایمیل خود را وارد کنید",
//       "email.email": "ایمیل را به درستی وارد کنید",
//       "required.password": "رمز عبور خود را وارد کنید",
//       "min.password": "رمز عبور باید حداقل شش کلمه باشد",
//     });

//     if (!isValid) {
//       return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors });
//     }

//     dispatch({ type: SET_LOGIN_SUBMITTING, payload: true });
//     dispatch({ type: SET_LOGIN_LOADING, payload: true });

//     try {
//       const response = await axios.post("/api/auth/login", user);

//       const firstName = response.data.user.firstName;

//       const successfulOptions = {
//         title: `${firstName ? ` ${firstName}` : ""}, خوش برگشتی`,
//         position: "tr",
//         autoDismiss: 1,
//       };

//       localStorage.setItem("token", response.data.token);

//       setToken(response.data.token);

//       dispatch(setAuth());
//       toast.success(successfulOptions.title);

//       dispatch({ type: LOGIN_RESET });
//     } catch (error) {
//       const title = `لطفا دوباره وارد شوید`;
//       handleError(error, dispatch, title);
//     } finally {
//       dispatch({ type: SET_LOGIN_SUBMITTING, payload: false });
//       dispatch({ type: SET_LOGIN_LOADING, payload: false });
//     }
//   };
// };

export const signOut = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `شما خارج شدید`,
      position: "tr",
      autoDismiss: 1,
    };

    // dispatch(clearAuth());
    // dispatch(clearAccount());
    dispatch(navigateTo("/loginsss"));
    localStorage.removeItem("token");

    // toast.success(successfulOptions.title);
    // dispatch(clearCart());
  };
};
