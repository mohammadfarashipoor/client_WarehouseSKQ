import React, { useEffect, useState } from "react";
import TitleCard from "@/components/TitleCard";
import RowEmplyee from "@/components/RowEmplyee";
import InputText from "@/components/Input/InputText";
import actions from "@/context/actions";
import { connect } from "react-redux";
import InputCheckBox from "../../components/Input/InputCheckBox";
import InputFile from "../../components/Input/InputFile";
function EmployeeList(props) {
  const {
    newEmployeeFormData,
    fetchEmployees,
    formErrors,
    fetchHandleEmployees,
    isLoading,
    newEmployeeChange,
    isSubmitting,
    newEmployeeHandle, handleEmployeeReset
  } = props;

  // کنترل نمایش مودال افزودن کارمند
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  useEffect(() => {
    fetchHandleEmployees();
  }, []);
  // ذخیره کارمند جدید و اضافه کردن آن به لیست
  const handleAddNewEmployee = () => {
    newEmployeeHandle();
    
    if (formErrors[0]) {
      setShowAddModal(false);
    }
  };
  const handleEditEmployee = (user) => {
    setShowAddModal(true)
    setEditMode(true)
    for (let info in user) {
      newEmployeeChange(info, user[info])
    }
  };
  const closeModalEmployee = () => {
    setShowAddModal(false)
    setEditMode(false)
    handleEmployeeReset()
  }
  return (
    <TitleCard
      title="فهرست کارکنان"
      leftBtn={true}
      handleBtn={() => setShowAddModal(true)}
      titleBtn={"جذب و استخدام"}
    >
      <div className="overflow-x-auto h-[80vh]">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr className="z-0">
              <th></th>
              <th>کد</th>
              <th>نام</th>
              <th>سمت</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {fetchEmployees?.map((employee, index) => (
              <RowEmplyee key={index} {...employee} handleEditEmployee={handleEditEmployee} />
            ))}
          </tbody>
          <tfoot>
            <tr className="z-0">
              <th></th>
              <th>کد</th>
              <th>نام</th>
              <th>سمت</th>
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
              error={formErrors["personalCode"]}
              placeholder={"مانند : EMP12"}
              name={"personalCode"}
              containerStyle="mt-4"
              label={"کد پرسنلی"}
              value={newEmployeeFormData.personalCode}
              onInputChange={(name, value) => {
                newEmployeeChange(name, value);
              }}
              disableValue={isSubmitting || editMode}
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
            <InputFile
              type="file"
              error={formErrors["contractURL"]}
              className="file-input file-input-bordered"
              name={"contractURL"}
              containerStyle="mt-4"
              label={"قرارداد"}
              value={newEmployeeFormData.contractURL}
              acceptType="application/pdf"
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
              <button className="btn" onClick={closeModalEmployee}>
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
