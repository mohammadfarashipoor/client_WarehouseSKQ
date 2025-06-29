// DailyAndMonthlyReport.js

import { connect } from "react-redux";
import actions from "@/context/actions";
import TitleCard from "@/components/TitleCard";
import InputSelect from "../../components/Input/InputSelect";
import { useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
function ReportEmpolyees(props) {
  const {  dataFilteredReports, fetchReportsHandle, filterReportForm, fetchHandleEmployees, formErrors, fetchEmployees, reportFilterFieldChange, submitFilterReport, isLoading } = props;
  useEffect(() => {
    fetchHandleEmployees()
    fetchReportsHandle()
  }, [])

  function extractLabelValue(data) {
    return data.map(({ name, _id }) => ({
      label: name,
      value: _id,
    }));
  }
  const EmployeeOptions = [{label:'همه کاربران',value:''},...extractLabelValue(fetchEmployees)];
  function handleSubmit(event) {
    event.preventDefault();
    submitFilterReport();
  }
  return (
    <TitleCard title="مدیریت گزارش ماهانه">
      <form onSubmit={handleSubmit} >
        {/* بخش گزارش ماهانه */}
        <div className="mb-4">
          <DatePicker
            calendar={persian}
            locale={persian_en}
            onlyMonthPicker
            format="YYYY/MM"
            name="datePickerFilter"
            onChange={(name, value) => {
              reportFilterFieldChange("datePickerFilter", value.validatedValue[0]);
            }}
            inputClass="input input-bordered w-full "
            containerStyle={{
              width: "100%"
            }}
          />
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
                  <td>{emp.employeeId.name + " " + emp.employeeId.personalCode}</td>
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
