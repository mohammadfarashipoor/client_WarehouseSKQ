import React, { useEffect, useState } from "react";
import TitleCard from "@/components/TitleCard";
import actions from "@/context/actions";
import { connect } from "react-redux";
import RowCustomer from "@/components/RowCustomer";
import NoContent from "@/components/NoContent";
import Pagination from "@/components/Pagination";
import NewCustomerModal from "../../components/NewCustomerModal";

function CustomersList(props) {
  const { newCustomerFormData,
    fetchCustomers,
    formErrors,
    fetchHandleCustomers,
    isLoading,
    newCustomerChange,
    isSubmitting,
    newCustomerHandle,
    pagination,
    editCustomerHandle,
    deletCustomerHandle,
    resetCustomerHandle
  } = props;

  // کنترل نمایش مودال افزودن کارمند
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setPage] = useState(1);


  useEffect(() => {
    fetchHandleCustomers(currentPage);
  }, [currentPage]);

  // ذخیره کارمند جدید و اضافه کردن آن به لیست
  const handleEditCustomerModal = (user) => {
    setShowAddModal(true)
    setEditMode(true)
    for (let info in user) {
      newCustomerChange(info, user[info])
    }
  };
  return (
    <main className="flex-1 overflow-y-auto bg-base-200 py-4 px-6">
      <TitleCard
        title="لیست خریداران"
        leftBtn={true}
        handleBtn={() => setShowAddModal(true)}
        titleBtn={"افزودن"}
      >
        <div className="overflow-x-auto h-[80vh]">
          {!fetchCustomers.length ? <NoContent /> : (<>
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr className="z-0">
                  <th></th>
                  <th>کد</th>
                  <th>نام</th>
                  <th>تلفن</th>
                  <th>وضعیت</th>
                  <th>آدرس</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {fetchCustomers?.map((customer, index) => (
                  <RowCustomer
                    key={index}
                    handleEditCustomerModal={handleEditCustomerModal}
                    deletCustomerHandle={deletCustomerHandle}
                    {...customer} />
                ))}
              </tbody>
            </table>
            <Pagination
              className="mt-4"
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}

            /></>
          )}

        </div>

        {showAddModal && (
          <NewCustomerModal
            editMode={editMode}
            newCustomerFormData={newCustomerFormData}
            formErrors={formErrors}
            isLoading={isLoading}
            newCustomerChange={newCustomerChange}
            isSubmitting={isSubmitting}
            newCustomerHandle={newCustomerHandle}
            setShowAddModal={setShowAddModal}
            setEditMode={setEditMode}
            editCustomerHandle={editCustomerHandle}
            resetCustomerHandle={resetCustomerHandle}
          />
        )}
      </TitleCard>
    </main>
  );
}
const mapStateToProps = (state) => {
  return {
    newCustomerFormData: state.customer.newCustomerFormData,
    fetchCustomers: state.customer.fetchCustomers,
    formErrors: state.customer.formErrors,
    isLoading: state.customer.isLoading,
    isSubmitting: state.customer.isSubmitting,
    pagination: state.customer.pagination,

  };
};
export default connect(mapStateToProps, actions)(CustomersList);
