import { EVENT_CHANGE, EVENT_RESET, FETCH_EVENTS, FETCH_EVENTS_BY_DATE, SET_EVENT_FORM_ERRORS, SET_EVENT_LOADING } from "./constants";

const initialState = {
    newEventFormData: {
        title: '',
        description: '',
        date: {}
    },
    fetchEvents: [],
    fetchEventsByDate: [],
    formErrors: {},
    isLoading: false
};
const eventReminderReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENT_CHANGE:
            return {
                ...state,
                newEventFormData: { ...state.newEventFormData, ...action.payload }
            };
        case FETCH_EVENTS:
            return {
                ...state,
                fetchEvents: action.payload
            };
        case FETCH_EVENTS_BY_DATE:
            return {
                ...state,
                fetchEventsByDate: action.payload
            };
        case SET_EVENT_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_EVENT_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case EVENT_RESET:
            return {
                ...state,
                newEventFormData: {
                    title: '',
                    description: '',
                },
                formErrors: {},
                isLoading: false
            };
        default:
            return state;
    }
};

export default eventReminderReducer;