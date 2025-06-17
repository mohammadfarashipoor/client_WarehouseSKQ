/*
 *
 * Signup actions
 *
 */

import { toast } from "react-toastify";
import axios from "axios";

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SET_SIGNUP_SUBMITTING,
  SET_SIGNUP_FORM_ERRORS,
} from "./constants";

import { setAuth } from "../Authentication/actions";
import setToken from "../../utils/token";
import handleError from "../../utils/error";
import { allFieldsValidation } from "../../utils/validation";

export const signupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData,
  };
};

export const signUp = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: "required|email",
        password: "required|min:6",
        name: "required",
      };

      const newUser = getState().signup.signupFormData;

      const { isValid, errors } = allFieldsValidation(newUser, rules, {
        "required.email": "ایمیل خود را وارد کنید",
        "required.password": "رمز عبور خود را وارد کنید",
        "required.name": "نام خود را وارد کنید",
      });

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
      dispatch({ type: SET_SIGNUP_LOADING, payload: true });

      const user = {
        ...newUser,
      };

      const response = await axios.post("/api/auth/register", user);
      // const response = { data: { token: "dddd" } };
      const successfulOptions = {
        title: `ثبت نام با موفقیت انجام شد .`,
        position: "tr",
        autoDismiss: 1,
      };

      localStorage.setItem("token", response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      toast.success(successfulOptions.title);
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      const title = `لطفا دوباره ثبت نام کنید`;
      handleError(error, dispatch, title);
    } finally {
      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
      dispatch({ type: SET_SIGNUP_LOADING, payload: false });
    }
  };
};
