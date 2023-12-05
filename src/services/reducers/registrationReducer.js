import { REGISTRATION_ACTION_TYPES } from "../actions/constants/registrationActionsConstants";
const initialState = {
  data: {},
  err: null,
  loading: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_ACTION_TYPES.REGISTRATION_REQUEST:
      return {
        ...state,
        err: null,
        loading: true,
      };

    case REGISTRATION_ACTION_TYPES.REGISTRATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case REGISTRATION_ACTION_TYPES.REGISTRATION_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default registrationReducer;
