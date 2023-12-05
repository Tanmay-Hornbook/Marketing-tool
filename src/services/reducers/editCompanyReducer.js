import { EDIT_COMPANY_ACTION_TYPES } from "../actions/constants/editCompanyActionConstants";

const initialState = {
  editCompany: {},
  err: null,
  loading: false,
};

const editCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_REQUEST:
      return {
        ...state,
        err: null,
        loading: true,
      };

    case EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_SUCCESS:
      return {
        ...state,
        editCompany: action.payload,
        loading: false,
      };

    case EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default editCompanyReducer;
