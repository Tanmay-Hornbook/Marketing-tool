import { GET_ROLE_ACTION_TYPES } from "../actions/constants/getRoleActionConstants";

export const getRoleRequest = (user_id) => ({
  type: GET_ROLE_ACTION_TYPES.GET_ROLE_REQUEST,
  payload: user_id,
});

export const getRoleSuccess = (data) => ({
  type: GET_ROLE_ACTION_TYPES.GET_ROLE_SUCCESS,
  payload: data,
});

export const getRoleFailure = (err) => ({
  type: GET_ROLE_ACTION_TYPES.GET_ROLE_FAILURE,
  payload: err,
});
