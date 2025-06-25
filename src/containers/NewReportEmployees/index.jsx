import actions from "@/context/actions";
import DatePicker from "react-multi-date-picker";
import { connect } from "react-redux";
import TitleCard from "@/components/TitleCard";
import InputText from "@/components/Input/InputText";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputSelect from "../../components/Input/InputSelect";
import { useEffect } from "react";
import ErrorText from "../../components/Typography/ErrorText";
function NewReportEmployees(props) {
  const { dailyReportForm, fetchReportsHandle,fetchHandleEmployees, reportFieldChange, newReportHandle, formErrors, fetchEmployees } =
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
          value={dailyReportForm.employeeId}
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
            onChange={(value) => reportFieldChange("date", value)}
            calendar={persian}
            locale={persian_fa}
            containerStyle={{
              width: "100%"
            }}
          />
          {formErrors["date"] && <ErrorText className="text-error">{formErrors["date"]}</ErrorText>}

        </div>
        <InputText
          error={formErrors["workHours"]}
          placeholder="ساعات کاری"
          type="number"
          name={"workHours"}
          containerStyle="mt-4"
          label={"ساعات کاری"}
          value={dailyReportForm.workHours}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <InputText
          error={formErrors["leaveHours"]}
          placeholder="ساعات مرخصی"
          type="number"
          name={"leaveHours"}
          containerStyle="mt-4"
          label={"ساعات مرخصی"}
          value={dailyReportForm.leaveHours}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <InputText
          error={formErrors["overtime"]}
          placeholder="ساعات اضافه"
          type="number"
          name={"overtime"}
          containerStyle="mt-4"
          label={"ساعات اضافه"}
          value={dailyReportForm.overtime}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <InputText
          placeholder="توضیحات"
          type="textarea"
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
