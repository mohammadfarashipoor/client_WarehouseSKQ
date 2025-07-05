import actions from "@/context/actions";
import DatePicker from "react-multi-date-picker";
import { connect } from "react-redux";
import TitleCard from "@/components/TitleCard";
import InputText from "@/components/Input/InputText";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import InputSelect from "../../components/Input/InputSelect";
import { useEffect } from "react";
import ErrorText from "../../components/Typography/ErrorText";
import Textarea from "../../components/Input/Textarea";
function NewReportEmployees(props) {
  const { dailyReportForm, fetchReportsHandle, fetchHandleEmployees, reportFieldChange, newReportHandle, formErrors, fetchEmployees } =
    props;
  useEffect(() => {
    fetchHandleEmployees()

  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    newReportHandle();
  };
  function extractLabelValue(data) {
    return data.map(({ name, _id }) => ({
      label: name,
      value: _id,
    }));
  }
  function getEmployeeNameByCode(employees, _id) {
    // جستجوی کارمند بر اساس personalCode
    const employee = employees.find(emp => emp._id === _id);

    // در صورت یافتن، نام کارمند را برمی‌گرداند؛ در غیر این صورت null یا مقدار دلخواهی برگردانید.
    return employee ? employee.name : null;
  }
  const EmployeeOptions = extractLabelValue(fetchEmployees);
  return (
    <TitleCard title="ثبت گزارش روزانه">
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputSelect name={'employeeId'}
          selectedValue={dailyReportForm.employeeId}
          placeholder={'کارمند مورد نظر رو انتخاب کنید'}
          error={formErrors["employeeId"]}
          options={EmployeeOptions} label={'نام کارمند'}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
            reportFieldChange('employeeName', getEmployeeNameByCode(fetchEmployees, value));
          }} />
        <div>
          <label className="label block mb-1">تاریخ</label>
          <DatePicker
            value={dailyReportForm.date}
            inputClass="input input-bordered w-full "
            onChange={(name, value) => {
              reportFieldChange("date", value.validatedValue[0])
            }}
            calendar={persian}
            locale={persian_en}
            containerStyle={{
              width: "100%"
            }}
          />
          {formErrors["date"] && <ErrorText className="text-error">{formErrors["date"]}</ErrorText>}

        </div>
        <div className="md:flex md:gap-2">
        <InputText
          error={formErrors["startWorkTime"]}
          type="time"
          name={"startWorkTime"}
          containerStyle="mt-4"
          label={"ساعت شروع"}
          value={dailyReportForm.startWorkTime}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <InputText
          error={formErrors["endWorkTime"]}
          type="time"
          name={"endWorkTime"}
          containerStyle="mt-4"
          label={"ساعت پایان"}
          value={dailyReportForm.endWorkTime}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
          />
          </div>
        <InputText
          error={formErrors["leaveHours"]}
          placeholder="مدت زمان مرخصی به "
          type="number"
          minLen="0"
          name={"leaveHours"}
          containerStyle="mt-4"
          stepLen="1"
          label={"مدت زمان مرخصی ( دقیقه )"}
          value={dailyReportForm.leaveHours}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <Textarea
          name={"description"}
          containerStyle="mt-4"
          label={"توضیحات"}
          value={dailyReportForm.description}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <button type="submit" className="btn btn-primary w-full">
          ثبت گزارش
        </button>
      </form>
    </TitleCard>
  );
}
const mapStateToProps = (state) => ({
  dailyReportForm: state.reportEmployees.dailyReportForm,
  formErrors: state.reportEmployees.formErrors,
  fetchEmployees: state.employee.fetchEmployees,

});
export default connect(mapStateToProps, actions)(NewReportEmployees);
