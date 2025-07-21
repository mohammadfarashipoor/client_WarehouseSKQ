import { FETCH_NOTIFICATION, FETCH_NOTIFICATION_ACTIVE ,PAGINATION_NOTIFICATION} from "./constants";
import handleError from "../../utils/error";
import axios from "axios";

export const fetchNotificationHandle = (page = 1) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/notification/all?page=${page}`);
            dispatch({
                type: FETCH_NOTIFICATION,
                payload: response.data?.notifications
            })
            dispatch({
                type: PAGINATION_NOTIFICATION,
                payload: response.data?.pagination
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
            dispatch(fetchNotificationHandle())
        } catch (error) {
            const title = `در دریافت اعلان ها مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
}

export const deleteNotificationHandle = (id) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`/api/notification/${id}`);
            dispatch(fetchNotificationHandle())
        } catch (error) {
            const title = `در حذف اعلان ها مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
}
// تغییر وضعیت بارگذاری
export const setLoading = (isLoading) => ({
    type: "SET_LOADING",
    payload: isLoading, // مقدار بولی: true یا false
});
