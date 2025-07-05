// reportActions.js
import {
  REPORT_FIELD_CHANGE,
  RESET_DAILY_REPORT_FORM,
  ADD_REPORT,
  SET_REPORT_FORM_ERRORS, DATA_FILTERED_REPORTS, FILTER_FIELD_CHANGE
} from "./constants";
import { allFieldsValidation } from "../../utils/validation";
import { toast } from "react-toastify";
import handleError from "../../utils/error";
import axios from "axios";
import { calculateWorkTimes } from "../../utils/time";
export const reportFieldChange = (name, value) => {
  let newVal = value;
  if (name === "date") {
    newVal = value;
  }
  return {
    type: REPORT_FIELD_CHANGE,
    payload: { [name]: newVal },
  };
};
export const reportFilterFieldChange = (name, value) => {
  return {
    type: FILTER_FIELD_CHANGE,
    payload: { [name]: value },
  };
};
export const handleDataFilteredReports = (value) => {
  return {
    type: DATA_FILTERED_REPORTS,
    payload: value,
  }
}
export const fetchReportsHandle = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("/api/report/all");
      dispatch({ type: ADD_REPORT, payload: response.data?.reports });
    } catch (error) {
      const title = `دریافت گزارش ها با مشکلی مواجه شد دوباره تلاش کنید`;
      handleError(error, dispatch, title);
    }
  }
}

export const saveReport = (method, url) => {
  return async (dispatch, getState) => {
    const rules = {
      employeeId: "required",
      startWorkTime: "required",
      endWorkTime: "required",
      leaveHours: "required",
      date: "required",
    };
    let dailyReportForm = getState().reportEmployees.dailyReportForm;
    const { isValid, errors } = allFieldsValidation(dailyReportForm, rules, {
      "required.employeeId": "نام کاربری را وارد کنید",
      "required.startWorkTime": "ساعات شروع را وارد کنید",
      "required.leaveHours": "مرخصی را وارد کنید",
      "required.date": "تاریخ را وارد کنید",
      "required.endWorkTime": "ساعت پایان را وارد کنید",
    });
    if (!isValid) {
      return dispatch({ type: SET_REPORT_FORM_ERRORS, payload: errors });
    }
    const {endWorkTime , startWorkTime , leaveHours} = dailyReportForm
    if (endWorkTime <= startWorkTime) {
      return toast.warning("ساعت پایان باید بعد از شروع باشد");
    }
    dispatch({ type: SET_REPORT_FORM_ERRORS, payload: {} });
    const {worked,overtime} = calculateWorkTimes(startWorkTime , endWorkTime , leaveHours)
    dispatch(reportFieldChange("workHours",worked))
    dispatch(reportFieldChange("overtime",overtime))
    dailyReportForm = getState().reportEmployees.dailyReportForm;

    // اعتبارسنجی ساده فرم، مشابه الگوی ورود
    try {
      const response = await axios({
        method,
        url,
        data: dailyReportForm
      });
      dispatch(fetchReportsHandle())
      dispatch({ type: RESET_DAILY_REPORT_FORM });
      toast.success("عملیات با مووفقیت انجام شد");
    } catch (error) {
      const title = `مشکلی پیش آمده دوباره تلاش کنید`;
      handleError(error, dispatch, title);
    }
  };
};


export const submitFilterReport = () => {
  return async (dispatch, getState) => {
    const rules = {
      datePickerFilter: "required",
    };
    const { filterReportForm } = getState().reportEmployees;

    const { isValid, errors } = allFieldsValidation(filterReportForm, rules, {
      "required.datePickerFilter": "ماه مورد نظر را وارد کنید",
    });
    if (!isValid) {
      return dispatch({ type: SET_REPORT_FORM_ERRORS, payload: errors });
    }
    try {
      const {
        datePickerFilter,
        personalCode
      } = filterReportForm
      const response = await axios.post("/api/report/by-month", { datePickerFilter,personalCode });
      dispatch(handleDataFilteredReports(response.data.reports))
    } catch (error) {
      const title = `مشکلی پیش آمده دوباره تلاش کنید`;
      handleError(error, dispatch, title);
    }
  };
};

export const newReportHandle = () => {
  return (dispatch, getState) => {
    return dispatch(saveReport('post', '/api/report/new'))
  }
}

export const editReportHandle = reportId => {
  return (dispatch, getState) => {
    return dispatch(saveReport('patch', `/api/report/edit/${reportId}`))
  }
}