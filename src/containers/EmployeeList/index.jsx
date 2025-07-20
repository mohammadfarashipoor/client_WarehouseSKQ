import React, { useEffect, useState } from "react";
import TitleCard from "@/components/TitleCard";
import RowEmplyee from "@/components/RowEmplyee";
import actions from "@/context/actions";
import { connect } from "react-redux";

import NewEmployeeModal from "../../components/NewEmployeeModal";
import NoContent from "../../components/NoContent";
function EmployeeList(props) {
  const {
    newEmployeeFormData,
    fetchEmployees,
    formErrors,
    fetchHandleEmployees,
    isLoading,
    newEmployeeChange,
    isSubmitting,
    handleSubmitingStatus,
    newEmployeeHandle,
    handleEmployeeReset,
    editEmployeeHandle,
    deleteEmployeeHandle
  } = props;

  // کنترل نمایش مودال افزودن کارمند
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    fetchHandleEmployees();
  }, []);
  // ذخیره کارمند جدید و اضافه کردن آن به لیست

  const handleEditEmployeeModal = (user) => {
    setShowAddModal(true)
    setEditMode(true)
    for (let info in user) {
      newEmployeeChange(info, user[info])
    }
  };

  return (
    <TitleCard
      title="فهرست کارکنان"
      leftBtn={true}
      handleBtn={() => setShowAddModal(true)}
      titleBtn={"افزودن"}
    >
      <div className="overflow-x-auto h-[80vh]">
        {!fetchEmployees ? <NoContent/> : (<table className="table table-xs table-pin-rows table-pin-cols">
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
              <RowEmplyee key={index} {...employee}
                handleEditEmployeeModal={handleEditEmployeeModal}
                deleteEmployeeHandle={deleteEmployeeHandle}

              />
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
        </table>)}
      </div>

      {/* مودال افزودن کارمند جدید */}
      {showAddModal && (
        <NewEmployeeModal
          editMode={editMode}
          newEmployeeFormData={newEmployeeFormData}
          formErrors={formErrors}
          isLoading={isLoading}
          newEmployeeChange={newEmployeeChange}
          isSubmitting={isSubmitting}
          handleSubmitingStatus={handleSubmitingStatus}
          newEmployeeHandle={newEmployeeHandle}
          handleEmployeeReset={handleEmployeeReset}
          setShowAddModal={setShowAddModal}
          setEditMode={setEditMode}
          editEmployeeHandle={editEmployeeHandle}
        />
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
