// actions/navigationActions.js
import history from "./history";

export const navigateTo = (path) => {
  return (dispatch, getState) => {
    // تغییر مسیر
    history.push(path);

    // dispatch یک اکشن ثبت تغییر مسیر (اختیاری)
    dispatch({ type: "NAVIGATION_DONE", payload: path });
  };
};
