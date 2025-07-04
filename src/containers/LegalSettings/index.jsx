import InputText from "@/components/Input/InputText";
import { useEffect } from "react";
import { formatThousand, toTomanWords } from "../../utils/numbers";


function LegalSettings(props) {
    const { legalSettingFormData, formErrors, isLoading, legalChangeSubmit, legalChange,getLegalSetting } = props
    useEffect(()=>{getLegalSetting()},[])
    const handleSubmit = (e)=>{
        e.preventDefault()
        legalChangeSubmit()
    }
    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                    <InputText
                        error={formErrors["hourlyRate"]}
                        name={"hourlyRate"}
                        containerStyle="mt-4"
                        label={"نرخ حقوق ساعتی"}
                        value={legalSettingFormData.hourlyRate}
                        placeholder={formatThousand(legalSettingFormData.hourlyRate)}
                        onInputChange={(name, value) => {
                            legalChange(name, value);
                        }}
                    />
                    {legalSettingFormData.hourlyRate && <span className="my-2">{toTomanWords(legalSettingFormData.hourlyRate)}</span>}
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
