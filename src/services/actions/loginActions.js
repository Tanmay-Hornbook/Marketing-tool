import { LOGIN_ACTION_TYPES } from "./constants/loginActionsConstants";

export const loginRequest = (payload) => ({
  type: LOGIN_ACTION_TYPES.LOGIN_REQUEST,
  payload: payload,
});

export const loginSuccess = (data) => ({
  type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (err) => ({
  type: LOGIN_ACTION_TYPES.LOGIN_FAILURE,
  payload: err,
});
