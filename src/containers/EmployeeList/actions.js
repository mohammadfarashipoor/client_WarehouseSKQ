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
import { onDeleteFile } from "../../utils/storage";

export const newEmployeeChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: EMPLOYEE_CHANGE,
        payload: formData,
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
                payload: response.data?.employees
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
export const saveEmployee = (method, url, formData) => {
    return async (dispatch, getState) => {
        const rules = {
            name: 'required',
            personalCode: 'required',
            position: 'required',
            contractPath: 'required',
            hourlyRate: 'required',
        };

        const { isValid, errors } = allFieldsValidation(formData, rules, {
            "required.name": "نام را وارد کنید",
            "required.personalCode": "کد پرسنلی را وارد کنید",
            "required.position": "سمت را وارد کنید",
            "required.contractPath": "قرارداد را وارد کنید",
            "required.hourlyRate": "مبلغ را وارد کنید",
        });
        if (!isValid) {
            dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: errors });
            return false;
        } else {
            dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: {} });
        }
        handleSubmitingStatus(true)
        dispatch({ type: SET_EMPLOYEE_LOADING, payload: true });

        try {
            // const response = await axios.post("/api/employee/new", newEmployee);
            const response = await axios({
                method,
                url,
                data: formData
            });
            const firstName = response.data?.employee?.name;
            toast.success(`${firstName || ''} ،عملیات با موفقیت انجام شد`);
            await dispatch(fetchHandleEmployees())
            dispatch(handleEmployeeReset())
            return true;
        } catch (error) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
            return false;
        } finally {
            handleSubmitingStatus(false)
            dispatch({ type: SET_EMPLOYEE_LOADING, payload: false });
        }
    };
};
export const newEmployeeHandle = () => {
    return (dispatch, getState) => {
        const newEmployee = getState().employee.newEmployeeFormData;
        return dispatch(saveEmployee('post', '/api/employee/new', newEmployee))
    }
}

export const editEmployeeHandle = employeeId => {
    return (dispatch, getState) => {
        const editEmployee = getState().employee.newEmployeeFormData;
        return dispatch(saveEmployee('patch', `/api/employee/edit/${employeeId}`, editEmployee))
    }
}
export const deleteEmployeeHandle = (employeeId,key) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`/api/employee/delete/${employeeId}`);
            await onDeleteFile(key)
            await dispatch(fetchHandleEmployees())
            toast.success(` حذف با موفقیت انجام شد`);

        } catch (error) {
            const title = `حذف با مشکلی مواجه شد دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        }

    }

}