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
            contractPath: 'required',
        };

        const newEmployee = getState().employee.newEmployeeFormData;
        const { isValid, errors } = allFieldsValidation(newEmployee, rules, {
            "required.name": "نام را وارد کنید",
            "required.personalCode": "کد پرسنلی را وارد کنید",
            "required.position": "سمت را وارد کنید",
            "required.contractPath": "قرارداد را وارد کنید",
        });
        if (!isValid) {
            return dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: errors });
        } else {
            dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: {} });
        }
        handleSubmitingStatus(true)
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
            handleSubmitingStatus(false)
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
    return async (dispatch, getState) => {
        try {
            const response = await axios.get("/api/employee/all");
            dispatch({
                type: FETCH_EMPLOYEES,
                payload: response.data
            })
        } catch (error) {
            const title = `در دریافت کارکنان مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }
}
export const handleSubmitingStatus = (status) => {
    return (dispatch, getState) => dispatch({ type: SET_EMPLOYEE_SUBMITTING, payload: status });
}