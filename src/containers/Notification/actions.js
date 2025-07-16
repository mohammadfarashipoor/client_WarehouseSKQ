import { FETCH_NOTIFICATION, FETCH_NOTIFICATION_ACTIVE } from "./constants";
import handleError from "../../utils/error";
import axios from "axios";

export const fetchNotificationHandle = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get("/api/notification/all");
            dispatch({
                type: FETCH_NOTIFICATION,
                payload: response.data?.notifications
            })
        } catch (error) {
            const title = `در دریافت اعلان ها مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
}

export const fetchNotificationActiveHandle = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get("/api/notification/active");
            dispatch({
                type: FETCH_NOTIFICATION_ACTIVE,
                payload: response.data?.notifications
            })

        } catch (error) {
            const title = `در دریافت اعلان ها مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
}
// تغییر وضعیت بارگذاری
export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading, // مقدار بولی: true یا false
});
