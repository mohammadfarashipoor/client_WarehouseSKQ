/*
 *
 * Legal reducer
 *
 */

import {
  LEGAL_CHANGE,
  SET_LEGAL_LOADING,
  SET_LEGAL_FORM_ERRORS,
  LEGAL_RESET,
} from './constants';

const initialState = {
  legalSettingFormData: {
    hourlyRate: '',
  },
  
  formErrors: {},
  isLoading: false
};

const legalSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEGAL_CHANGE:
      return {
        ...state,
        legalSettingFormData: { ...state.legalSettingFormData, ...action.payload }
      };
    case SET_LEGAL_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_LEGAL_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case LEGAL_RESET:
      return {
        ...state,
        formErrors: {},
        isLoading: false
      };
    default:
      return state;
  }
};

export default legalSettingReducer;
