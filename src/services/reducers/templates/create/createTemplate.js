import { CREATE_TEMPLATE_ACTION_CONSTANTS } from "../../../actions/constants/templates/create/createTemplateConstants";

const initialState = {
  template: [],
  loading: false,
  err: null,
};

const createTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEMPLATE_ACTION_CONSTANTS.CREATE_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
        err: null,
      };

    case CREATE_TEMPLATE_ACTION_CONSTANTS.CREATE_TEMPLATE_SUCCESS:
      console.log("console_action", action);
      console.log("console_state", state.template);
      return {
        ...state,
        template: [...state.template.data, action.payload.data],
        loading: false,
      };

    case CREATE_TEMPLATE_ACTION_CONSTANTS.CREATE_TEMPLATE_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
