import { EVENT_CHANGE, EVENT_RESET, FETCH_EVENTS, FETCH_EVENTS_BY_DATE, SET_EVENT_FORM_ERRORS, SET_EVENT_LOADING } from "./constants";
import handleError from "@/utils/error";
import { allFieldsValidation } from "@/utils/validation";
import axios from "axios";
import { toast } from "react-toastify";

export const newEventChange = (name, value) => {
    let formData = {};
    formData[name] = value;
    return {
        type: EVENT_CHANGE,
        payload: formData,
    };
};

export const fetchHandleEvents = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get("/api/event/all");
            dispatch({
                type: FETCH_EVENTS,
                payload: response.data?.events
            })
        } catch (error) {
            const title = `در دریافت رویدادها مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
}

export const saveEvents = (method, url, formData) => {
    return async (dispatch, getState) => {
        const rules = {
            title: 'required',
        };

        const { isValid, errors } = allFieldsValidation(formData, rules, {
            "required.title": "عنوان را وارد کنید",

        });
        if (!isValid) {
            dispatch({ type: SET_EVENT_FORM_ERRORS, payload: errors });
            return false;
        } else {
            dispatch({ type: SET_EVENT_FORM_ERRORS, payload: {} });
        }
        dispatch({ type: SET_EVENT_LOADING, payload: true });

        try {
            const response = await axios({
                method,
                url,
                data: formData
            });
            toast.success(`رویداد با موفقیت افزوده شد`);
            await dispatch(fetchHandleEvents())
            dispatch({ type: EVENT_RESET })
            return true;
        } catch (error) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
            return false;
        } finally {
            dispatch({ type: SET_EVENT_LOADING, payload: false });
        }
    };
};

export const fetchEventsByDateHandle = (isoDate) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.post("/api/event/by-date", { date: isoDate });
            dispatch({ type: FETCH_EVENTS_BY_DATE, payload: data.events });
        } catch (err) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(err, dispatch, title);
        }
    }
};

export const newEventHandle = () => {
    return (dispatch, getState) => {
        const newEvent = getState().event.newEventFormData;
        return dispatch(saveEvents('post', '/api/event/new', newEvent))
    }
}

export const editEventHandle = (eventId) => {
    return (dispatch, getState) => {

        const editEvent = getState().event.newEventFormData;
        return dispatch(saveEvents('patch', `/api/event/edit/${eventId}`, editEvent))
    }
}
export const deleteEventHandle = (eventId) => {
    return async (dispatch, getState) => {
        try {

            const response = await axios.delete(`/api/event/delete/${eventId}`);
            await dispatch(fetchHandleEvents())
            toast.success(` حذف با موفقیت انجام شد`);
        } catch (error) {
            const title = `حذف با مشکلی مواجه شد دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }

}