import React, { useEffect, useState } from "react";
import TitleCard from "@/components/TitleCard";
import RowEmplyee from "@/components/RowEmplyee";
import InputText from "@/components/Input/InputText";
import actions from "@/context/actions";
import { connect } from "react-redux";
import InputCheckBox from "../../components/Input/InputCheckBox";
function EmployeeList(props) {
  const {
    newEmployeeFormData,
    fetchEmployees,
    formErrors,
    fetchHandleEmployees,
    isLoading,
    newEmployeeChange,
    isSubmitting,
    newEmployeeHandle,
  } = props;

  // کنترل نمایش مودال افزودن کارمند
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    fetchHandleEmployees();
  }, []);
  // ذخیره کارمند جدید و اضافه کردن آن به لیست
  const handleAddNewEmployee = () => {
    newEmployeeHandle();
    if (formErrors && !formErrors[0]) {
      setShowAddModal(false);
    }
  };
  return (
    <TitleCard
      title="لیست کارکنان"
      leftBtn={true}
      handleBtn={() => setShowAddModal(true)}
      titleBtn={"افزودن کارمند جدید"}
    >
      <div className="overflow-x-auto h-[80vh]">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr className="z-0">
              <th></th>
              <th>کد</th>
              <th>نام</th>
              <th>سمت</th>
              <th>تاریخ شروع</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {fetchEmployees?.map((employee, index) => (
              <RowEmplyee key={index} {...employee} />
            ))}
          </tbody>
          <tfoot>
            <tr className="z-0">
              <th></th>
              <th>کد</th>
              <th>نام</th>
              <th>سمت</th>
              <th>تاریخ شروع</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* مودال افزودن کارمند جدید */}
      {showAddModal && (
        <div
          className="modal modal-open "
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div className="modal-box relative">
            <h3 className="font-bold text-lg mb-4">افزودن کارمند جدید</h3>
            <InputText
              type="text"
              error={formErrors["peronsalCode"]}
              placeholder={"کد کارمند"}
              name={"peronsalCode"}
              containerStyle="mt-4"
              label={"کد پرسنلی"}
              value={newEmployeeFormData.peronsalCode}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting}
            />
            <InputText
              type="text"
              error={formErrors["name"]}
              placeholder={"نام کارمند"}
              name={"name"}
              containerStyle="mt-4"
              label={"نام"}
              value={newEmployeeFormData.name}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting}
            />
            <InputText
              type="text"
              error={formErrors["position"]}
              placeholder={"مثلاً مدیر"}
              name={"position"}
              containerStyle="mt-4"
              label={"سمت"}
              value={newEmployeeFormData.position}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting}
            />
            <InputText
              type="text"
              error={formErrors["dateStart"]}
              placeholder={"به صورت شمسی مثلاً 1/6/1404"}
              name={"dateStart"}
              containerStyle="mt-4"
              label={"تاریخ شروع"}
              value={newEmployeeFormData.dateStart}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting}
            />
            <InputText
              type="text"
              error={formErrors["contractURL"]}
              name={"contractURL"}
              containerStyle="mt-4"
              label={"قرارداد"}
              value={newEmployeeFormData.contractURL}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting}
            />
            <InputCheckBox
              error={formErrors["status"]}
              name={"status"}
              containerStyle="mt-4"
              label={"وضعیت فعال"}
              checked={newEmployeeFormData.status}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting}
            />

            <div className="modal-action gap-2">
              <button className="btn" onClick={() => setShowAddModal(false)}>
                انصراف
              </button>
              <button
                className={`btn btn-primary ${isLoading ? " loading" : ""}`}
                disabled={isSubmitting}
                onClick={handleAddNewEmployee}
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </TitleCard>
  );
}
const mapStateToProps = (state) => {
  return {
    newEmployeeFormData: state.employee.newEmployeeFormData,
    fetchEmployees: state.employee.fetchEmployees,
    formErrors: state.employee.formErrors,
    isLoading: state.employee.isLoading,
    isSubmitting: state.employee.isSubmitting,
  };
};
export default connect(mapStateToProps, actions)(EmployeeList);
