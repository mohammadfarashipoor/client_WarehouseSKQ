/*
 *
 * Employee reducer
 *
 */

import {
    EMPLOYEE_CHANGE,
    EMPLOYEE_RESET,FETCH_EMPLOYEES ,
    SET_EMPLOYEE_LOADING,
    SET_EMPLOYEE_FORM_ERRORS,
    SET_EMPLOYEE_SUBMITTING
} from './constants';

const initialState = {
    newEmployeeFormData: {
        name: '',
        peronsalCode: '',
        position: '',
        dateStart: '',
        dateEnd: '',
        status: false,
        contractURL: '',
        records: '',
    },
    fetchEmployees: [],
    formErrors: {},
    isSubmitting: false,
    isLoading: false
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_CHANGE:
            return {
                ...state,
                newEmployeeFormData: { ...state.newEmployeeFormData, ...action.payload }
            };
        case FETCH_EMPLOYEES:
            return {
                ...state,
                fetchEmployees: action.payload
            };
        case SET_EMPLOYEE_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_EMPLOYEE_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case SET_EMPLOYEE_SUBMITTING:
            return {
                ...state,
                isSubmitting: action.payload
            };
        case EMPLOYEE_RESET:
            return {
                ...state,
                newEmployeeFormData: {
                    name: '',
                    peronsalCode: '',
                    position: '',
                    dateStart: '',
                    status: false,
                    contractURL: '',
                    records: '',
                },
                formErrors: {},
                isSubmitting: false,
                isLoading: false
            };
        default:
            return state;
    }
};

export default employeeReducer;
