import { EDIT_COMPANY_ACTION_TYPES } from "./constants/editCompanyActionConstants";

export const editCompanyRequest = (payload) => ({
  type: EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_REQUEST,
  payload: payload,
});

export const editCompanySuccess = (data) => ({
  type: EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_SUCCESS,
  payload: data,
});

export const editCompanyFailure = (err) => ({
  type: EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_FAILURE,
  payload: err,
});
