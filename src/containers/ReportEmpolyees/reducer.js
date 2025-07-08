// reportReducer.js
import {
  REPORT_FIELD_CHANGE,
  RESET_DAILY_REPORT_FORM,
  ADD_REPORT,
  SET_REPORT_FORM_ERRORS, 
  FILTER_FIELD_CHANGE ,
   SET_REPORT_LOADING , 
   DATA_FILTERED_REPORTS,
   ADD_SUMMARY
} from "./constants";

const initialState = {
  dailyReportForm: {
    employeeId: "",
    employeeName: "",
    date: {},
    workHours: "",
    leaveHours: 0,
    startWorkTime:"08:00",
    endWorkTime:"17:00",
    overtime: "",
    description:""
  },
  filterReportForm: {
    datePickerFilter: "",
    personalCode: ""
  },
  dataFilteredReports: [],
  reports: [],
  summary:{},
  formErrors: {},
  isLoading: false,
  selectedMonth: "",
};

const ReportEmpolyeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_FIELD_CHANGE:
      return {
        ...state,
        dailyReportForm: { ...state.dailyReportForm, ...action.payload },
      };
    case DATA_FILTERED_REPORTS:
      return {
        ...state,
        dataFilteredReports: action.payload,
      };
    case RESET_DAILY_REPORT_FORM:
      return {
        ...state,
        dailyReportForm: { ...initialState.dailyReportForm },
      };
    case FILTER_FIELD_CHANGE:
      return {
        ...state,
        filterReportForm: { ...state.filterReportForm, ...action.payload },
      };
    case ADD_REPORT:
      return {
        ...state,
        reports: action.payload,
      };
    case ADD_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case SET_REPORT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };
    case SET_REPORT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default ReportEmpolyeesReducer;
