import React, { useEffect, useState } from "react";
import TitleCard from "@/components/TitleCard";
import InputText from "@/components/Input/InputText";
import actions from "@/context/actions";
import { connect } from "react-redux";
import RowCustomer from "../../components/RowCustomer";
function CustomersList(props) {
  const {
    newCustomerFormData,
    fetchCustomers,
    formErrors,
    fetchHandleCustomers,
    isLoading,
    newCustomerChange,
    isSubmitting,
    newCustomerHandle,
  } = props;

  // کنترل نمایش مودال افزودن کارمند
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    fetchHandleCustomers();
  }, []);
  // ذخیره کارمند جدید و اضافه کردن آن به لیست
  const handleAddNewCustomer = () => {
    newCustomerHandle();
    if (!formErrors && !formErrors[0]) {
      setShowAddModal(false);
    }
  };
  return (
    <main className="flex-1 overflow-y-auto bg-base-200 py-4 px-6">
      <TitleCard
        title="لیست مشتریان"
        leftBtn={true}
        handleBtn={() => setShowAddModal(true)}
        titleBtn={"افزودن مشتری جدید"}
      >
        <div className="overflow-x-auto h-[80vh]">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr className="z-0">
                <th></th>
                <th>کد</th>
                <th>نام</th>
                <th>تلفن</th>
                <th>آدرس</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {fetchCustomers?.map((customer, index) => (
                <RowCustomer key={index} {...customer} />
              ))}
            </tbody>
            <tfoot>
              <tr className="z-0">
                <th></th>
                <th>کد</th>
                <th>نام</th>
                <th>تلفن</th>
                <th>آدرس</th>
                <th>عملیات</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {showAddModal && (
          <div
            className="modal modal-open "
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAddModal(false);
            }}
          >
            <div className="modal-box relative">
              <h3 className="font-bold text-lg mb-4">افزودن مشتری جدید</h3>
              <InputText
                type="text"
                error={formErrors["personalCode"]}
                placeholder={"کد مشتری"}
                name={"personalCode"}
                containerStyle="mt-4"
                label={"کد پرسنلی"}
                value={newCustomerFormData.personalCode}
                onInputChange={(name, value) => {
                  newCustomerChange(name, value);
                }}
                disableValue={isSubmitting}
              />
              <InputText
                type="text"
                error={formErrors["name"]}
                placeholder={"نام مشتری"}
                name={"name"}
                containerStyle="mt-4"
                label={"نام"}
                value={newCustomerFormData.name}
                onInputChange={(name, value) => {
                  newCustomerChange(name, value);
                }}
                disableValue={isSubmitting}
              />
              <InputText
                type="text"
                error={formErrors["phoneNumber"]}
                placeholder={"مثلاً 0911123456"}
                name={"phoneNumber"}
                containerStyle="mt-4"
                label={"تلفن"}
                value={newCustomerFormData.phoneNumber}
                onInputChange={(name, value) => {
                  newCustomerChange(name, value);
                }}
                disableValue={isSubmitting}
              />
              <InputText
                type="text"
                error={formErrors["address"]}
                placeholder={"تهران"}
                name={"address"}
                containerStyle="mt-4"
                label={"آدرس"}
                value={newCustomerFormData.address}
                onInputChange={(name, value) => {
                  newCustomerChange(name, value);
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
                  onClick={handleAddNewCustomer}
                >
                  ذخیره
                </button>
              </div>
            </div>
          </div>
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
  };
};
export default connect(mapStateToProps, actions)(CustomersList);
