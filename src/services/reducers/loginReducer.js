import { LOGIN_ACTION_TYPES } from "../actions/constants/loginActionsConstants";

const initialState = {
  user: {},
  loading: false,
  err: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        err: null,
        loading: true,
      };

    case LOGIN_ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case LOGIN_ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
