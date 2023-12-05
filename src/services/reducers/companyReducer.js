import { COMPANY_ACTION_TYPES } from "../actions/constants/companyActionConstants";

const initialState = {
  company: {},
  err: null,
  loading: false,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_ACTION_TYPES.GET_COMPANY_REQUEST:
      return {
        ...state,
        err: null,
        loading: true,
      };

    case COMPANY_ACTION_TYPES.GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload,
        loading: false,
      };

    case COMPANY_ACTION_TYPES.GET_COMPANY_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default companyReducer;
