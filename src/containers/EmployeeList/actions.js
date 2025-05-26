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
            peronsalCode: 'required',
            position: 'required',
            dateStart: 'required',
            contractURL: 'required',
        };

        const newEmployee = getState().employee.newEmployeeFormData;
        const fetchEmployees = getState().employee.fetchEmployees;

        const { isValid, errors } = allFieldsValidation(newEmployee, rules, {
            "required.name": "نام را وارد کنید",
            "required.peronsalCode": "کد پرسنلی را وارد کنید",
            "required.position": "سمت را وارد کنید",
            "required.dateStart": "تاریخ شروع را وارد کنید",
            "required.contractURL": "قرارداد را وارد کنید",
        });
        if (!isValid) {
            return dispatch({ type: SET_EMPLOYEE_FORM_ERRORS, payload: errors });
        }

        dispatch({ type: SET_EMPLOYEE_SUBMITTING, payload: true });
        dispatch({ type: SET_EMPLOYEE_LOADING, payload: true });

        try {
            // const response = await axios.post("/api/data/employee", newEmployee);
            const firstName = newEmployee.name;
            toast.success(`${firstName ? ` ${firstName}` : ""}, کارمند جدید اضافه شد`);
            dispatch({ type: EMPLOYEE_RESET });
            fetchHandleEmployees()
            dispatch({ type: EMPLOYEE_RESET });
        } catch (error) {
            const title = `مشکلی رخ داده دوباره تلاش کنید`;
            handleError(error, dispatch, title);
        } finally {
            dispatch({ type: SET_EMPLOYEE_SUBMITTING, payload: false });
            dispatch({ type: SET_EMPLOYEE_LOADING, payload: false });
        }
    };
};

export const fetchHandleEmployees = () => {
    return {
        type: FETCH_EMPLOYEES,
        payload: [
            {
                num: "1",
                personalCode: "EM123",
                position: "انباردار",
                name: "علیرضا",
                dateStart: "1/6/1404",
                status: false,
            },
            {
                num: "2",
                personalCode: "EM124",
                position: "مدیر",
                name: "رضا",
                dateStart: "2/6/1404",
                status: true,
            },
            {
                num: "3",
                personalCode: "EM125",
                position: "کارشناس",
                name: "سارا",
                dateStart: "3/6/1404",
                status: false,
            },
        ]
    };
};
