// DailyAndMonthlyReport.js

import { connect } from "react-redux";
import actions from "@/context/actions";
import TitleCard from "@/components/TitleCard";
import InputSelect from "../../components/Input/InputSelect";
import { useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useMemo } from "react";
import { HOURLY_RATE, OVERTIME_RATE } from "./constants";
import { formatThousand } from "../../utils/numbers";
function ReportEmpolyees(props) {
  const { dataFilteredReports, fetchReportsHandle, filterReportForm, fetchHandleEmployees, formErrors, fetchEmployees, reportFilterFieldChange, submitFilterReport, isLoading } = props;
  useEffect(() => {
    fetchHandleEmployees()
    fetchReportsHandle()
  }, [])
  const totals = useMemo(() => {
    return dataFilteredReports.reduce(
      (acc, r) => {
        // فرض: ردیف‌ها به صورت استرینگ هستند؛ پس parseFloat:
        acc.workHours += parseFloat(r.workHours || 0);
        acc.leaveHours += parseFloat(r.leaveHours || 0);
        acc.overtime += parseFloat(r.overtime || 0);
        return acc;
      },
      { workHours: 0, leaveHours: 0, overtime: 0 }
    );
  }, [dataFilteredReports]);

  function extractLabelValue(data) {
    return data.map(({ name, _id }) => ({
      label: name,
      value: _id,
    }));
  }
  const EmployeeOptions = [{ label: 'همه کاربران', value: '' }, ...extractLabelValue(fetchEmployees)];
  function handleSubmit(event) {
    event.preventDefault();
    submitFilterReport();
  }
  const hourlyRate = totals.workHours * HOURLY_RATE
  const overrtimeRate = totals.overtime * OVERTIME_RATE
  console.log(hourlyRate,overrtimeRate)
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
                  <td>{emp.employeeId?.name + " " + emp.employeeId?.personalCode}</td>
                  <td>{emp.workHours}</td>
                  <td>{emp.leaveHours}</td>
                  <td>{emp.overtime}</td>
                </tr>
              )
            )}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td>جمع کل</td>
              <td>{totals.workHours}</td>
              <td>{totals.leaveHours}</td>
              <td>{totals.overtime}</td>
            </tr>
           {totals && <tr className="font-bold">
              <td>{`مبلغ کل : ${formatThousand(hourlyRate + overrtimeRate)}`}</td>
              <td>{formatThousand(hourlyRate)}</td>
              <td>{totals.leaveHours}</td>
              <td>{formatThousand(overrtimeRate)}</td>
            </tr>}
          </tfoot>
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
