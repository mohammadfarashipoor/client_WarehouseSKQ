import TabList from "../../components/TabList";
import LegalSettings from "../LegalSettings";
import actions from "@/context/actions";
import { connect } from "react-redux";
function ProfileSetting(props) {
    const { legalSettingFormData, formErrors, isLoading, legalChangeSubmit, legalChange,getLegalSetting } = props

    const tabOption = [
        { ariaLabel: 'کاربری', children: <>hi</>, defaultChecked: true },
        {
            ariaLabel: 'حقوقی',
            children:
                <LegalSettings
                    legalSettingFormData={legalSettingFormData}
                    formErrors={formErrors}
                    isLoading={isLoading}
                    legalChangeSubmit={legalChangeSubmit}
                    legalChange={legalChange}
                    getLegalSetting={getLegalSetting}
                />
        },
    ]

    return (
        <TabList name='tabs-setting' tabOption={tabOption} />
    );
}

const mapStateToProps = (state) => {
    return {
        legalSettingFormData: state.profileSetting.legalSettingFormData,
        formErrors: state.profileSetting.formErrors,
        isLoading: state.profileSetting.isLoading,
    };
};
export default connect(mapStateToProps, actions)(ProfileSetting);