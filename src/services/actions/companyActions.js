import { COMPANY_ACTION_TYPES } from "./constants/companyActionConstants";

export const getCompanyRequest = (payload) => ({
  type: COMPANY_ACTION_TYPES.GET_COMPANY_REQUEST,
  payload: payload,
});

export const getCompanySuccess = (data) => ({
  type: COMPANY_ACTION_TYPES.GET_COMPANY_SUCCESS,
  payload: data,
});

export const getCompanyFailure = (err) => ({
  type: COMPANY_ACTION_TYPES.GET_COMPANY_FAILURE,
  payload: err,
});
