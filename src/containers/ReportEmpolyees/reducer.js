// reportReducer.js
import {
  REPORT_FIELD_CHANGE,
  RESET_DAILY_REPORT_FORM,
  ADD_REPORT,
  SET_SELECTED_MONTH,
  SET_REPORT_FORM_ERRORS,
} from "./constants";

const initialState = {
  dailyReportForm: {
    employeeId: "",
    date: {},
    workHours: "",
    leaveHours: "",
    overtime: "",
  },
  reports: [],
  formErrors: {},
  selectedMonth: "",
};

const ReportEmpolyeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_FIELD_CHANGE:
      return {
        ...state,
        dailyReportForm: { ...state.dailyReportForm, ...action.payload },
      };
    case RESET_DAILY_REPORT_FORM:
      return {
        ...state,
        dailyReportForm: { ...initialState.dailyReportForm },
      };
    case ADD_REPORT:
      return {
        ...state,
        reports: [...state.reports, action.payload],
      };
    case SET_SELECTED_MONTH:
      return {
        ...state,
        selectedMonth: action.payload,
      };
    case SET_REPORT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };
    default:
      return state;
  }
};

export default ReportEmpolyeesReducer;
