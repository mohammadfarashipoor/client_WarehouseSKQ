import { useState } from "react";
import InputCheckBox from "../../components/Input/InputCheckBox";
import InputFile from "../../components/Input/InputFile";
import { onUpload } from "../../utils/storage";
import InputText from "@/components/Input/InputText";
import { toTomanWords } from "../../utils/numbers";

function NewEmployeeModal(props) {
    const { editMode,
        newEmployeeFormData,
        formErrors,
        isLoading,
        newEmployeeChange,
        isSubmitting,
        handleSubmitingStatus,
        newEmployeeHandle,
        handleEmployeeReset,
        setShowAddModal,
        setEditMode,
        editEmployeeHandle
    } = props;
    const [filePdf, setFilePdf] = useState(null);
    const [progress, setProgress] = useState(0);
    const handleAddNewEmployee = async () => {
        try {
            const progressHandle = ({ loaded, total }) =>
                setProgress(Math.round((loaded * 100) / total))
            handleSubmitingStatus(true)
            if (!newEmployeeFormData.contractURL) {
                const { key } = await onUpload(filePdf, progressHandle)
                if (key) {
                    newEmployeeChange('contractURL', key)
                }
            }
            let isErrorFeild = false;
            if (editMode && newEmployeeFormData._id) {
                isErrorFeild = await editEmployeeHandle(newEmployeeFormData._id)
            } else {
                isErrorFeild = await newEmployeeHandle()
            }
            if (!isErrorFeild) {
                setShowAddModal(false);
            }
            handleSubmitingStatus(false)
            setProgress(0)
        } catch (error) {
            console.log(error)
        }

    };
    const closeModalEmployee = () => {
        setShowAddModal(false)
        setEditMode(false)
        handleEmployeeReset()
    }
    const handleFileChange = (file) => {
        newEmployeeChange(file.name, file.value)
        setFilePdf(file.files[0])
    }

    return (
        <div
            className="modal modal-open "
            onClick={(e) => {
                if (e.target === e.currentTarget) closeModalEmployee();
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
                <InputText
                    type="number"
                    error={formErrors["hourlyRate"]}
                    placeholder={"100,000 ریال"}
                    name={"hourlyRate"}
                    containerStyle="mt-4"
                    label={"نرخ حقوق ساعتی"}
                    value={newEmployeeFormData.hourlyRate}
                    onInputChange={(name, value) => {
                        newEmployeeChange(name, value);
                    }}
                    disableValue={isSubmitting}
                />
                {newEmployeeFormData.hourlyRate && <span className="my-2">{toTomanWords(newEmployeeFormData.hourlyRate)}</span>}
                
                <InputFile
                    type="file"
                    error={formErrors["contractPath"]}
                    className="file-input file-input-bordered"
                    name={"contractPath"}
                    containerStyle="mt-4"
                    label={"قرارداد"}
                    value={newEmployeeFormData.contractPath}
                    acceptType="application/pdf"
                    progress={progress}
                    editMode={editMode}
                    onInputChange={(file) => {
                        handleFileChange(file);
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
    )
}
export default NewEmployeeModal