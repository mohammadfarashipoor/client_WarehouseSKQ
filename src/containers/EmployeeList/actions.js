/*
 *
 * Login actions
 *
 */

import { toast } from "react-toastify";
import { navigateTo } from "@/context/navigationActions";

import {
    EMPLOYEE_CHANGE,
    EMPLOYEE_RESET,
    SET_EMPLOYEE_LOADING,
    SET_EMPLOYEE_FORM_ERRORS,
    FETCH_EMPLOYEES,
    SET_EMPLOYEE_SUBMITTING
} from './constants';

import handleError from "@/utils/error";
import { allFieldsValidation } from "@/utils/validation";
import axios from "axios";

export const newEmployeeChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: EMPLOYEE_CHANGE,
        payload: formData,
    };
};

export const newEmployeeHandle = () => {
    return async (dispatch, getState) => {
        const rules = {
            name: 'required',
            personalCode: 'required',
            position: 'required',
            contractURL: 'required',
        };

        const newEmployee = getState().employee.newEmployeeFormData;

        const { isValid, errors } = allFieldsValidation(newEmployee, rules, {
            "required.name": "نام را وارد کنید",
            "required.personalCode": "کد پرسنلی را وارد کنید",
            "required.position": "سمت را وارد کنید",
            "required.contractURL": "قرارداد را وارد کنید",
        });
        if (!isValid) {
            return dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: errors });
        } else {
            dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: {} });
        }

        dispatch({ type: SET_EMPLOYEE_SUBMITTING, payload: true });
        dispatch({ type: SET_EMPLOYEE_LOADING, payload: true });

        try {
            const response = await axios.post("/api/employee/new", newEmployee);
            const firstName = response.data?.employee?.name;
            toast.success(`${firstName ? ` ${firstName}` : ""}, کارمند جدید اضافه شد`);
            dispatch({ type: EMPLOYEE_RESET });
            fetchHandleEmployees()
            handleEmployeeReset()
        } catch (error) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        } finally {
            dispatch({ type: SET_EMPLOYEE_SUBMITTING, payload: false });
            dispatch({ type: SET_EMPLOYEE_LOADING, payload: false });
        }
    };
};
export const handleEmployeeReset = () => {
    return (dispatch, getState) => {
        dispatch({ type: EMPLOYEE_RESET });
    }

}
export const fetchHandleEmployees = () => {
    return {
        type: FETCH_EMPLOYEES,
        payload: [
            {
                num: "1",
                personalCode: "EM123",
                position: "انباردار",
                name: "علیرضا",
                contractUrl: "https://esign.com/wp-content/uploads/Freelance-Contract.png",
                status: false,
            },
            {
                num: "2",
                personalCode: "EM124",
                position: "مدیر",
                name: "رضا",
                contractUrl: "https://esign.com/wp-content/uploads/Freelance-Contract.png",
                status: true,
            },
            {
                num: "3",
                personalCode: "EM125",
                position: "کارشناس",
                name: "سارا",
                contractUrl: "https://esign.com/wp-content/uploads/Freelance-Contract.png",
                status: false,
            },
        ]
    };
};
