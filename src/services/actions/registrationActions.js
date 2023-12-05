import { REGISTRATION_ACTION_TYPES } from "./constants/registrationActionsConstants";

export const registrationRequest = (payload) => ({
  type: REGISTRATION_ACTION_TYPES.REGISTRATION_REQUEST,
  payload: payload,
});

export const registrationSuccess = (data) => ({
  type: REGISTRATION_ACTION_TYPES.REGISTRATION_SUCCESS,
  payload: data,
});

export const registrationFailure = (err) => ({
  type: REGISTRATION_ACTION_TYPES.REGISTRATION_FAILURE,
  payload: err,
});
