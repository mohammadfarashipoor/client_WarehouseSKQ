// DailyAndMonthlyReport.js
import React from "react";
import { Calendar, DateObject, toDateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { connect } from "react-redux";
import actions from "@/context/actions";
import TitleCard from "@/components/TitleCard";
import { isoToJalali } from "../../utils/date";

function ReportEmpolyees(props) {
  const { reports, selectedMonth, setSelectedMonthAction } = props;

  const handleMonthSelect = (date) => {
    // فرض بر این است که monthDate دارای خصوصیت month.number است
    setSelectedMonthAction(date.month.number);
  };

  // تابعی جهت گروه‌بندی گزارش‌های ماهانه بر اساس کارمند
  const getMonthlySummary = (reports, month) => {
    const summary = {};
    reports.forEach((report) => {
      // اطمینان از نوع تاریخ. در صورتی که report.date نمونه Date نباشد، تبدیل می‌کنیم.
      const newDate = isoToJalali(report.date);
      if (newDate.month.number === parseInt(month)) {
        if (!summary[report.employeeId]) {
          summary[report.employeeId] = {
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
    return summary;
  };

  return (
    <TitleCard title="مدیریت گزارش ماهانه">
      {/* بخش گزارش ماهانه */}
      <div className="mb-4">
        <label className="label block mb-1">انتخاب ماه</label>
        <Calendar
          calendar={persian}
          locale={persian_fa}
          onChange={handleMonthSelect}
          onlyMonthPicker
        />
      </div>
      {selectedMonth ? (
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
              {Object.entries(getMonthlySummary(reports, selectedMonth)).map(
                ([emp, data]) => (
                  <tr key={emp}>
                    <td>{emp}</td>
                    <td>{data.workHours}</td>
                    <td>{data.leaveHours}</td>
                    <td>{data.overtime}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">ماه مورد نظر را انتخاب کنید.</p>
      )}
    </TitleCard>
  );
}

const mapStateToProps = (state) => ({
  dailyReportForm: state.reportEmployees.dailyReportForm,
  reports: state.reportEmployees.reports,
  selectedMonth: state.reportEmployees.selectedMonth,
});

export default connect(mapStateToProps, actions)(ReportEmpolyees);
