/*
 *
 * Login actions
 *
 */

import { toast } from "react-toastify";
import { navigateTo } from "@/context/navigationActions";

import {
    CUSTOMER_CHANGE,
    CUSTOMER_RESET,
    SET_CUSTOMER_LOADING,
    SET_CUSTOMER_FORM_ERRORS,
    FETCH_CUSTOMERS,
    SET_CUSTOMER_SUBMITTING
} from './constants';

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

export const newCustomerHandle = () => {
    return async (dispatch, getState) => {
        const rules = {
            name: 'required',
            peronsalCode: 'required',
            phoneNumber: 'required',
            address: 'required',
        };

        const newCustomer = getState().customer.newCustomerFormData;
        const fetchCustomers = getState().customer.fetchCustomers;

        const { isValid, errors } = allFieldsValidation(newCustomer, rules, {
            "required.name": "نام را وارد کنید",
            "required.peronsalCode": "کد پرسنلی را وارد کنید",
            "required.phoneNumber": "تلفن را وارد کنید",
            "required.address": "آدرس را وارد کنید",
        });
        if (!isValid) {
            return dispatch({ type: SET_CUSTOMER_FORM_ERRORS, payload: errors });
        }

        dispatch({ type: SET_CUSTOMER_SUBMITTING, payload: true });
        dispatch({ type: SET_CUSTOMER_LOADING, payload: true });

        try {
            // const response = await axios.post("/api/data/customer", newCustomer);
            const firstName = newCustomer.name;
            toast.success(`${firstName ? ` ${firstName}` : ""}, مشتری جدید اضافه شد`);
            dispatch({ type: CUSTOMER_RESET });
            fetchHandleCustomers()
            dispatch({ type: CUSTOMER_RESET });
        } catch (error) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        } finally {
            dispatch({ type: SET_CUSTOMER_SUBMITTING, payload: false });
            dispatch({ type: SET_CUSTOMER_LOADING, payload: false });
        }
    };
};

export const fetchHandleCustomers = () => {
    return {
        type: FETCH_CUSTOMERS,
        payload: [
            {
                num: "1",
                personalCode: "CM123",
                phoneNumber: "09156332365",
                name: "علیرضا",
                address: "تهران",
            },
             {
                num: "1",
                personalCode: "CM123",
                phoneNumber: "09156332365",
                name: "علیرضا",
                address: "تهران",
            },  {
                num: "1",
                personalCode: "CM123",
                phoneNumber: "09156332365",
                name: "علیرضا",
                address: "تهران",
            },
        ]
    };
};
