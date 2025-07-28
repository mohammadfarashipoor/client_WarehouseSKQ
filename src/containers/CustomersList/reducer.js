/*
 *
 * Customer reducer
 *
 */

import {
    CUSTOMER_CHANGE,
    CUSTOMER_RESET, FETCH_CUSTOMERS,
    SET_CUSTOMER_LOADING,
    SET_CUSTOMER_FORM_ERRORS,
    SET_CUSTOMER_SUBMITTING,
    PAGINATION_CUSTOMERS
} from './constants';
const initialState = {
    newCustomerFormData: {
        name: '',
        personalCode: '',
        status: false,
        mobile: '',
        address: '',
        location: { coordinates: [0, 0] },
        contractURL: 'test',
        contractPath: 'test',
    },
    fetchCustomers: [],
    formErrors: {},
    pagination: {},
    isSubmitting: false,
    isLoading: false
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_CHANGE:
            return {
                ...state,
                newCustomerFormData: { ...state.newCustomerFormData, ...action.payload }
            };
        case FETCH_CUSTOMERS:
            return {
                ...state,
                fetchCustomers: action.payload
            };
        case SET_CUSTOMER_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_CUSTOMER_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case PAGINATION_CUSTOMERS:
            return {
                ...state,
                pagination: action.payload
            };
        case SET_CUSTOMER_SUBMITTING:
            return {
                ...state,
                isSubmitting: action.payload
            };
        case CUSTOMER_RESET:
            return {
                ...state,
                newCustomerFormData: {
                    ...initialState.newCustomerFormData
                },
                formErrors: {},
                pagination: {},
                isSubmitting: false,
                isLoading: false
            };
        default:
            return state;
    }
};

export default customerReducer;
