import InputText from "@/components/Input/InputText";
import { useEffect } from "react";


function LegalSettings(props) {
    const { legalSettingFormData, formErrors, isLoading, legalChangeSubmit, legalChange,getLegalSetting } = props
    useEffect(()=>{getLegalSetting()},[])
    return (
        <div>
            <form onSubmit={legalChangeSubmit} noValidate>
                <div className="mb-4">
                    <InputText
                        error={formErrors["hourlyRate"]}
                        name={"hourlyRate"}
                        containerStyle="mt-4"
                        label={"نرخ حقوق ساعتی"}
                        value={legalSettingFormData.hourlyRate}
                        placeholder={legalSettingFormData.hourlyRate}
                        onInputChange={(name, value) => {
                            legalChange(name, value);
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}
                >ثبت</button>
            </form>
        </div>
    );
}

export default LegalSettings;
