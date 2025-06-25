// DailyAndMonthlyReport.js

import { connect } from "react-redux";
import actions from "@/context/actions";
import TitleCard from "@/components/TitleCard";
import { isoToJalali, persianMonths } from "../../utils/date";
import InputSelect from "../../components/Input/InputSelect";
import { useEffect } from "react";

function ReportEmpolyees(props) {
  const { reports, dataFilteredReports,fetchReportsHandle, handleDataFilteredReports, filterReportForm, fetchHandleEmployees, formErrors, fetchEmployees, reportFilterFieldChange, submitFilterReport, isLoading } = props;
  useEffect(() => {
    fetchHandleEmployees()
    fetchReportsHandle()
  }, [])
  // تابعی جهت گروه‌بندی گزارش‌های ماهانه بر اساس کارمند
  const getMonthlySummary = (reports, month) => {
    const summary = {};
    reports.forEach((report) => {
      // تبدیل تاریخ به صورت شمسی (تابع isoToJalali باید پیاده‌سازی شده باشد)
      const newDate = isoToJalali(report.date);

      if (newDate.month.number === parseInt(month, 10)) {
        if (!summary[report.employeeId]) {
          summary[report.employeeId] = {
            employeeName: report.employeeId.name, // استخراج نام کارمند
            employeeId: report.employeeId.personalCode, // استخراج نام کارمند
            workHours: 0,
            leaveHours: 0,
            overtime: 0,
          };
        }
        summary[report.employeeId].workHours += report.workHours;
        summary[report.employeeId].leaveHours += report.leaveHours;
        summary[report.employeeId].overtime += report.overtime;
      }
    });

    // تبدیل شی summary به آرایه از طریق Object.values
    return Object.values(summary);
  };

  function extractLabelValue(data) {
    return data.map(({ name, personalCode }) => ({
      label: name,
      value: personalCode,
    }));
  }
  const EmployeeOptions = extractLabelValue(fetchEmployees);
  function handleSubmit(event) {
    event.preventDefault();
    submitFilterReport()
    const result = getMonthlySummary(reports, filterReportForm.monthNum);
    handleDataFilteredReports(result)
  }
  return (
    <TitleCard title="مدیریت گزارش ماهانه">
      <form onSubmit={handleSubmit} >
        {/* بخش گزارش ماهانه */}
        <div className="mb-4">
          <InputSelect name={'monthNum'}
            value={filterReportForm.monthNum}
            placeholder={'ماه مورد نظر رو انتخاب کنید'}
            error={formErrors["monthNum"]}
            options={persianMonths} label={'انتخاب ماه'} onInputChange={(name, value) => {
              reportFilterFieldChange(name, value);
            }} />
        </div>
        <div className="mb-4">
          <InputSelect name={'personalCode'}
            value={filterReportForm.personalCode}
            placeholder={'کارمند مورد نظر رو انتخاب کنید'}
            error={formErrors["personalCode"]}
            options={EmployeeOptions} label={'نام کارمند'} onInputChange={(name, value) => {
              reportFilterFieldChange(name, value);
            }} />
        </div>
        <button
          type="submit"
          className={
            "btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")
          }
        >
          نمایش
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>کارمند</th>
              <th>ساعات کاری</th>
              <th>ساعات مرخصی</th>
              <th>ساعات اضافه</th>
            </tr>
          </thead>
          <tbody>
            {dataFilteredReports && dataFilteredReports.map(
              (emp, index) => (
                <tr key={index}>
                  <td>{emp.employeeName + " "+ emp.employeeId }</td>
                  <td>{emp.workHours}</td>
                  <td>{emp.leaveHours}</td>
                  <td>{emp.overtime}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

    </TitleCard>
  );
}

const mapStateToProps = (state) => ({
  dailyReportForm: state.reportEmployees.dailyReportForm,
  reports: state.reportEmployees.reports,
  filterReportForm: state.reportEmployees.filterReportForm,
  formErrors: state.reportEmployees.formErrors,
  isLoading: state.reportEmployees.isLoading,
  fetchEmployees: state.employee.fetchEmployees,
  dataFilteredReports: state.reportEmployees.dataFilteredReports,


});

export default connect(mapStateToProps, actions)(ReportEmpolyees);
