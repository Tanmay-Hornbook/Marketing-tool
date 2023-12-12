import { CREATE_TEMPLATE_ACTION_CONSTANTS } from "../../constants/templates/create/createTemplateConstants";

export const createTemplateRequest = (payload) => ({
  type: CREATE_TEMPLATE_ACTION_CONSTANTS.CREATE_TEMPLATE_REQUEST,
  payload: payload,
});

export const createTemplateSuccess = (data) => ({
  type: CREATE_TEMPLATE_ACTION_CONSTANTS.CREATE_TEMPLATE_SUCCESS,
  payload: data,
});

export const createTemplateFailure = (err) => ({
  type: CREATE_TEMPLATE_ACTION_CONSTANTS.CREATE_TEMPLATE_FAILURE,
  payload: err,
});
