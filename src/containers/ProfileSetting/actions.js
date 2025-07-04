import axios from 'axios';
import {
    LEGAL_CHANGE,
    SET_LEGAL_LOADING,
    SET_LEGAL_FORM_ERRORS,
    LEGAL_RESET,
} from './constants';
import { allFieldsValidation } from "../../utils/validation";
import handleError from "../../utils/error";
import { toast } from "react-toastify";

export const legalChange = (name, value) => {
    let formData = {};
    formData[name] = value;
    return {
        type: LEGAL_CHANGE,
        payload: formData,
    };
};

export const legalChangeSubmit = () => {
    return async (dispatch, getState) => {
        const rules = {
            hourlyRate: "required",
        };

        const legal = getState().profileSetting.legalSettingFormData;

        const { isValid, errors } = allFieldsValidation(legal, rules, {
            "required.hourlyRate": "مبلغ خود را وارد کنید",
        });
        if (!isValid) {
            return dispatch({ type: SET_LEGAL_FORM_ERRORS, payload: errors });
        }

        dispatch({ type: SET_LEGAL_LOADING, payload: true });

        try {
            const response = await axios.put("/api/setting/legal", legal);
            dispatch({ type: LEGAL_CHANGE, payload: response.data });

            toast.success('مبلغ با موفقیت تغییر کرد');

            dispatch({ type: LEGAL_RESET });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch({ type: SET_LEGAL_LOADING, payload: false });
        }
    };
};

export const getLegalSetting = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: SET_LEGAL_LOADING, payload: true });
            const response = await axios.get("/api/setting");
            dispatch({ type: LEGAL_CHANGE, payload:response.data.setting });

        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch({ type: SET_LEGAL_LOADING, payload: false });
        }
    };
};