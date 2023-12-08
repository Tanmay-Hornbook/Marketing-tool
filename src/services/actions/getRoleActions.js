import { GET_ROLE_ACTION_TYPES } from "./constants/getRoleActionConstants";

export const getRoleRequest = (role_id) => ({
  type: GET_ROLE_ACTION_TYPES.GET_ROLE_REQUEST,
  userId: role_id,
});

export const getRoleSuccess = (data) => ({
  type: GET_ROLE_ACTION_TYPES.GET_ROLE_SUCCESS,
  payload: data,
});

export const getRoleFailure = (err) => ({
  type: GET_ROLE_ACTION_TYPES.GET_ROLE_FAILURE,
  payload: err,
});
