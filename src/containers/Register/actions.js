// /*
//  *
//  * Signup actions
//  *
//  */

// import { toast } from "react-toastify";
// import axios from "axios";

// import {
//   SIGNUP_CHANGE,
//   SIGNUP_RESET,
//   SET_SIGNUP_LOADING,
//   SET_SIGNUP_SUBMITTING,
//   SUBSCRIBE_CHANGE,
//   SET_SIGNUP_FORM_ERRORS,
// } from "./constants";

// import { setAuth } from "../Authentication/actions";
// import setToken from "../../utils/token";
// import handleError from "../../utils/error";
// import { allFieldsValidation } from "../../utils/validation";

// export const signupChange = (name, value) => {
//   let formData = {};
//   formData[name] = value;

//   return {
//     type: SIGNUP_CHANGE,
//     payload: formData,
//   };
// };

// export const subscribeChange = () => {
//   return {
//     type: SUBSCRIBE_CHANGE,
//   };
// };

// export const signUp = () => {
//   return async (dispatch, getState) => {
//     try {
//       const rules = {
//         email: "required|email",
//         password: "required|min:6",
//         firstName: "required",
//         lastName: "required",
//       };

//       const newUser = getState().signup.signupFormData;
//       const isSubscribed = getState().signup.isSubscribed;

//       const { isValid, errors } = allFieldsValidation(newUser, rules, {
//         "required.email": "ایمیل خود را وارد کنید",
//         "required.password": "رمز عبور خود را وارد کنید",
//         "required.firstName": "نام خود را وارد کنید",
//         "required.lastName": "نام خانوادگی خود را وارد کنید",
//       });

//       if (!isValid) {
//         return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
//       }

//       dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
//       dispatch({ type: SET_SIGNUP_LOADING, payload: true });

//       const user = {
//         isSubscribed,
//         ...newUser,
//       };

//       const response = await axios.post("/api/auth/register", user);

//       const successfulOptions = {
//         title: `با موفقیت ثبت نام انجام شد .به زودی ایمیلی از طرف ما دریافت خواهید کرد.`,
//         position: "tr",
//         autoDismiss: 1,
//       };

//       localStorage.setItem("token", response.data.token);

//       setToken(response.data.token);

//       dispatch(setAuth());
//       toast.success(successfulOptions.title);
//       dispatch({ type: SIGNUP_RESET });
//     } catch (error) {
//       const title = `لطفا دوباره ثبت نام کنید`;
//       handleError(error, dispatch, title);
//     } finally {
//       dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
//       dispatch({ type: SET_SIGNUP_LOADING, payload: false });
//     }
//   };
// };
