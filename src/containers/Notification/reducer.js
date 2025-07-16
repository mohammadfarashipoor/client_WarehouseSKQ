/*
 *
 * Notification reducer
 *
 */

import {
    FETCH_NOTIFICATION,
    FETCH_NOTIFICATION_ACTIVE,
    SET_LOADING,
} from './constants';

const initialState = {
    notifications: [],
    notificationsActive: [],
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
