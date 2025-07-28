

import { toast } from "react-toastify";
import {
    CUSTOMER_CHANGE,
    CUSTOMER_RESET,
    SET_CUSTOMER_LOADING,
    SET_CUSTOMER_FORM_ERRORS,
    FETCH_CUSTOMERS,
    SET_CUSTOMER_SUBMITTING,
    PAGINATION_CUSTOMERS
} from './constants';
import axios from "axios";

import handleError from "@/utils/error";
import { allFieldsValidation } from "@/utils/validation";

export const newCustomerChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: CUSTOMER_CHANGE,
        payload: formData,
    };
};

export const fetchHandleCustomers = (page = 1) => {
    return async (dispatch, getState) => {
        try {
            let response = null
            if (page) {
                response = await axios.get(`/api/customer/all/?page=${page}`);
            } else {
                response = await axios.get(`/api/customer/all`);
            }
            dispatch({
                type: FETCH_CUSTOMERS,
                payload: response.data?.customers
            })
            dispatch({
                type: PAGINATION_CUSTOMERS,
                payload: response.data?.pagination
            })
        } catch (error) {
            const title = `در دریافت کارکنان مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
};

export const saveCustomer = (method, url, formData) => {
    return async (dispatch, getState) => {
        const rules = {
            name: 'required',
            personalCode: 'required',
            address: 'required',
        };


        const { isValid, errors } = allFieldsValidation(formData, rules, {
            "required.name": "نام را وارد کنید",
            "required.personalCode": "کد پرسنلی را وارد کنید",
            "required.address": "آدرس را وارد کنید",
        });
        if (!isValid) {
            return dispatch({ type: SET_CUSTOMER_FORM_ERRORS, payload: errors });
        }
        dispatch({ type: SET_CUSTOMER_FORM_ERRORS, payload: {} })
        dispatch({ type: SET_CUSTOMER_SUBMITTING, payload: true });
        dispatch({ type: SET_CUSTOMER_LOADING, payload: true });

        try {
            // const response = await axios.post("/api/customer/new", newCustomer);
            const response = await axios({
                method,
                url,
                data: formData
            });
            const firstName = response?.data?.customer.name;
            toast.success(`${firstName ? ` ${firstName}` : ""}, مشتری جدید اضافه شد`);
            dispatch(resetCustomerHandle());
            dispatch(fetchHandleCustomers());
            
        } catch (error) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        } finally {
            dispatch({ type: SET_CUSTOMER_SUBMITTING, payload: false });
            dispatch({ type: SET_CUSTOMER_LOADING, payload: false });
        }
    };
};
export const newCustomerHandle = () => {
    return (dispatch, getState) => {
        const newCustomer = getState().customer.newCustomerFormData;
        return dispatch(saveCustomer('post', '/api/customer/new', newCustomer))
    }
}
export const resetCustomerHandle = () => {
    return (dispatch, getState) => {
        return dispatch({ type: CUSTOMER_RESET });
    }
}
export const editCustomerHandle = customerId => {
    return (dispatch, getState) => {
        const editCustomer = getState().customer.newCustomerFormData;
        return dispatch(saveCustomer('patch', `/api/customer/edit/${customerId}`, editCustomer))
    }
}

export const deletCustomerHandle = (customerId) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`/api/customer/delete/${customerId}`);
            await dispatch(fetchHandleCustomers())
            toast.success(` حذف با موفقیت انجام شد`);

        } catch (error) {
            const title = `حذف با مشکلی مواجه شد دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }

}