// DailyAndMonthlyReport.js

import { connect } from "react-redux";
import actions from "@/context/actions";
import TitleCard from "@/components/TitleCard";
import InputSelect from "../../components/Input/InputSelect";
import { useEffect, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useMemo } from "react";
import { formatThousand } from "../../utils/numbers";
import ErrorText from "../../components/Typography/ErrorText";
import  {useExportExcel} from "@/hooks/useExportExcel";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { formatMinutes } from "../../utils/time";

function ReportEmpolyees(props) {
  const { dataFilteredReports, fetchReportsHandle, filterReportForm, fetchHandleEmployees, formErrors, fetchEmployees, reportFilterFieldChange, submitFilterReport, isLoading, legalSettingFormData, getLegalSetting} = props;
  useEffect(() => {
    fetchHandleEmployees()
    fetchReportsHandle()
    getLegalSetting()
  }, [])
  const tableRef = useRef(null);

  // این هوک هر بار با props جدید می‌سازد
  const onExport = useExportExcel(tableRef, {
    fileName: `گزارش_${filterReportForm.datePickerFilter}`,
    sheetName: 'گزارش‌ها'
  });
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
  const {hourlyRate}= legalSettingFormData
  const overtimeRate= hourlyRate * 1.5
  const hourlyRateTotal = totals.workHours * hourlyRate
  const overrtimeRateTotal = totals.overtime * overtimeRate
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
          {formErrors["datePickerFilter"]
            && (
              <ErrorText className="text-error">{formErrors["datePickerFilter"]}</ErrorText>
            )}
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
      <div className="flex  w-full items-center gap-2">
      <button type="submit" className="btn btn-primary w-[90%]">
        نمایش
      </button>

      <div className="dropdown dropdown-end w-[10%]">
        <label tabIndex={0} className="btn ">
        <ChevronDownIcon
          className={
            "w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all  " 
          }
        />
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-10"
        >
          <li>        
            <button
              onClick={onExport}
              type="button"
              className="btn w-full ">
              دانلود اکسل
            </button>
          </li>
        </ul>
      </div>
    </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full" ref={tableRef}>
          <thead>
            <tr>
              <th>کارمند</th>
              <th>تاریخ</th>
              <th>ساعات کاری</th>
              <th>ساعات مرخصی</th>
              <th>ساعات اضافه</th>
              <th className="hidden">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {dataFilteredReports && dataFilteredReports.map(
              (emp, index) => (
                <tr key={index}>
                  <td>{emp.employeeId?.name + " " + emp.employeeId?.personalCode}</td>
                  <td>{emp.date?.split("T")[0]}</td>
                  <td>{formatMinutes(emp.workHours)}</td>
                  <td>{emp.leaveHours}</td>
                  <td>{formatMinutes(emp.overtime)}</td>
                  <td className="hidden">{emp.description}</td>
                </tr>
              )
            )}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td>جمع کل</td>
              <td></td>
              <td>{formatMinutes(totals.workHours)}</td>
              <td>{totals.leaveHours}</td>
              <td>{formatMinutes(totals.overtime)}</td>
            </tr>
            {totals && <tr className="font-bold">
              <td>{`مبلغ کل : ${formatThousand(hourlyRateTotal + overrtimeRateTotal)}`}</td>
              <td></td>
              <td>{formatThousand(hourlyRateTotal)}</td>
              <td>{totals.leaveHours}</td>
              <td>{formatThousand(overrtimeRateTotal)}</td>
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
  legalSettingFormData: state.profileSetting.legalSettingFormData,
});

export default connect(mapStateToProps, actions)(ReportEmpolyees);
