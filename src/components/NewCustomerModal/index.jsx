import InputCheckBox from "../../components/Input/InputCheckBox";
import InputText from "@/components/Input/InputText";
import Textarea from "@/components/Input/Textarea";


function NewCustomerModal(props) {
    const { editMode,
        newCustomerFormData,
        formErrors,
        isLoading,
        newCustomerChange,
        isSubmitting,
        newCustomerHandle,
        setShowAddModal,
        setEditMode,
        editCustomerHandle,
        resetCustomerHandle,
    } = props;
    const handleAddNewEmployee = async () => {
        try {

            let isErrorFeild = false;
            if (editMode && newCustomerFormData._id) {
                isErrorFeild = await editCustomerHandle(newCustomerFormData._id)
            } else {
                isErrorFeild = await newCustomerHandle()
            }
            if (!isErrorFeild) {
                setShowAddModal(false);
            }
        } catch (error) {
            console.log(error)
        }

    };
    const closeModalCustomer = () => {
        setShowAddModal(false)
        setEditMode(false)
        resetCustomerHandle();
    }

    return (
        <div
            className="modal modal-open "
            onClick={(e) => {
                if (e.target === e.currentTarget) closeModalCustomer();
            }}
        >
            <div className="modal-box relative">
                <h3 className="font-bold text-lg mb-4">افزودن کارمند جدید</h3>
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
                    disableValue={isSubmitting || editMode}
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
                    type="number"
                    error={formErrors["mobile"]}
                    placeholder={"موبایل"}
                    name={"mobile"}
                    containerStyle="mt-4"
                    label={"موبایل"}
                    value={newCustomerFormData.mobile}
                    onInputChange={(name, value) => {
                        newCustomerChange(name, value);
                    }}
                    disableValue={isSubmitting}
                />
                {/* <div className="mt-4">
                <label className="block mb-2">مختصات جغرافیایی</label>
                <CoordinatePicker
                  value={location}
                  onChange={setLocation}
                  onAddressChange={setAddress}
                  width="100%"
                  height="350px"
                />
              </div> */}
                <Textarea
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
                <InputCheckBox
                    error={formErrors["status"]}
                    name={"status"}
                    containerStyle="mt-4"
                    label={"وضعیت فعال"}
                    checked={newCustomerFormData.status}
                    onInputChange={(name, value) => {
                        newCustomerChange(name, value);
                    }}
                    disableValue={isSubmitting}
                /> 
                <div className="modal-action gap-2">
                    <button className="btn" onClick={closeModalCustomer}>
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
    )
}
export default NewCustomerModal