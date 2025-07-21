/*
 *
 * Notification reducer
 *
 */

import {
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_ACTIVE,
    SET_LOADING,
    PAGINATION_NOTIFICATION
} from './constants';

const initialState = {
    notifications: [],
    notificationsActive: [],
    pagination: {},
    formErrors: {},
    isLoading: false,
}
const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload,
            };
        case FETCH_NOTIFICATION_ACTIVE:
            return {
                ...state,
                notificationsActive: action.payload,
            };
        case PAGINATION_NOTIFICATION:
            return {
                ...state,
                pagination: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default notificationsReducer;
