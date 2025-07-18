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

export const fetchNotificationUnReadHandle = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get("/api/notification/unread");
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

export const markAsReadNotificationHandle = (id) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.patch(`/api/notification/mark-as-read/${id}`, { markAsRead: true });
            dispatch(fetchNotificationUnReadHandle())
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
