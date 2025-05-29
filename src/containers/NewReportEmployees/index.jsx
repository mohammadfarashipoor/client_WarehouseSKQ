import actions from "@/context/actions";
import DatePicker from "react-multi-date-picker";
import { connect } from "react-redux";
import TitleCard from "@/components/TitleCard";
import InputText from "@/components/Input/InputText";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
function NewReportEmployees(props) {
  const { dailyReportForm, reportFieldChange, submitDailyReport, formErrors } =
    props;
  const handleSubmit = (e) => {
    e.preventDefault();
    submitDailyReport();
  };
  return (
    <TitleCard title="ثبت گزارش روزانه">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputText
          error={formErrors["employeeId"]}
          placeholder="نام یا شناسه کارمند"
          name={"employeeId"}
          containerStyle="mt-4"
          label={"کارمند"}
          value={dailyReportForm.employeeId}
          onInputChange={(name, value) => {
            reportFieldChange(name, value);
          }}
        />
        <div>
          <label className="label block mb-1">تاریخ</label>
          <DatePicker
            value={dailyReportForm.date}
            onChange={(value) => reportFieldChange("date", value)}
            calendar={persian}
            locale={persian_fa}
            className="w-full green bg-base-200"
            style={{}}
          />
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
});
export default connect(mapStateToProps, actions)(NewReportEmployees);
