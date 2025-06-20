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
import { dateObjectToISO } from "../../utils/date";
export const reportFieldChange = (name, value) => {
  let newVal = value;
  if (name === "date") {
    newVal = dateObjectToISO(value);
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
export const submitDailyReport = () => {
  return (dispatch, getState) => {
    const rules = {
      employeeId: "required",
      workHours: "required",
      leaveHours: "required",
      date: "required",
      overtime: "required",
    };

    const { dailyReportForm } = getState().reportEmployees;

    const { isValid, errors } = allFieldsValidation(dailyReportForm, rules, {
      "required.employeeId": "نام کاربری را وارد کنید",
      "required.workHours": "ساعات کاری را وارد کنید",
      "required.leaveHours": "مرخصی را وارد کنید",
      "required.date": "تاریخ را وارد کنید",
      "required.overtime": "اضافه کاری را وارد کنید",
    });
    if (!isValid) {
      return dispatch({ type: SET_REPORT_FORM_ERRORS, payload: errors });
    }
    // اعتبارسنجی ساده فرم، مشابه الگوی ورود
    try {
      const newReport = {
        id: Date.now(), // استفاده از زمان به‌عنوان شناسه ساده
        employeeId: dailyReportForm.employeeId,
        date: dailyReportForm.date,
        workHours: Number(dailyReportForm.workHours),
        leaveHours: Number(dailyReportForm.leaveHours),
        overtime: Number(dailyReportForm.overtime),
      };

      dispatch({ type: ADD_REPORT, payload: newReport });
      dispatch({ type: RESET_DAILY_REPORT_FORM });
      toast.success("گزارش با مووفقیت افزوده شد");
    } catch (error) {
      const title = `مشکلی پیش آمده دوباره تلاش کنید`;
      handleError(error, dispatch, title);
    }
  };
};
export const submitFilterReport = () => {
  return (dispatch, getState) => {
    const rules = {
      monthNum: "required",
    };

    const { filterReportForm } = getState().reportEmployees;

    const { isValid, errors } = allFieldsValidation(filterReportForm, rules, {
      "required.monthNum": "ماه مورد نظر را وارد کنید",
    });
    if (!isValid) {
      return dispatch({ type: SET_REPORT_FORM_ERRORS, payload: errors });
    }
    try {
      const {
        monthNum,
        personalCode
      } = filterReportForm
      // const response = await axios.post("/api/employee/filter",  {monthNum,personalCode});
      // handleDataFilteredReports(response.data)
    } catch (error) {
      const title = `مشکلی پیش آمده دوباره تلاش کنید`;
      handleError(error, dispatch, title);
    }
  };
};

