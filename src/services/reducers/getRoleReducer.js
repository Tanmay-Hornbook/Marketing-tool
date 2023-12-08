import { GET_ROLE_ACTION_TYPES } from "../actions/constants/getRoleActionConstants";

const initialState = {
  role: [],
  loading: false,
  err: null,
};

const getRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLE_ACTION_TYPES.GET_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        err: null,
      };

    case GET_ROLE_ACTION_TYPES.GET_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload,
        loading: false,
      };

    case GET_ROLE_ACTION_TYPES.GET_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default getRoleReducer;
