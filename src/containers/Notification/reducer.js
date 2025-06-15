/*
 *
 * Notification reducer
 *
 */

import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    MARK_AS_READ,
    SET_LOADING,
    SET_ERROR
} from './constants';

const initialState = {
    notifications: [{ id: 1, message: "عملیات با موفقیت انجام شد", type: "success", timestamp: Date.now(), isRead: false }],
    isLoading: false,
    error: null,
    filterType: null,
}
const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };

        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id !== action.payload.id
                ),
            };

        case MARK_AS_READ:
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    notification.id === action.payload.id
                        ? { ...notification, isRead: true }
                        : notification
                ),
            };

        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default notificationsReducer;
