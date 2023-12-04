import { USER_ACTION_TYPES } from "./constants/userActionConstants";
// * GET USERS
//////////////

// * SINGLE
///////////
export const getSingleUserRequest = (userId) => ({
  type: USER_ACTION_TYPES.GET_ONE_USER_REQUEST,
  payload: userId,
});

export const getSingleUserSuccess = (data) => ({
  type: USER_ACTION_TYPES.GET_ONE_USER_SUCCESS,
  payload: data,
});

export const getSingleUserFailure = (err) => ({
  type: USER_ACTION_TYPES.GET_ONE_USER_SUCCESS,
  payload: err,
});

// * ALL
////////
export const getUsersRequest = (payload) => ({
  type: USER_ACTION_TYPES.GET_USERS_REQUEST,
  payload: payload,
});

export const getUsersSuccess = (data) => ({
  type: USER_ACTION_TYPES.GET_USERS_SUCCESS,
  payload: data,
});

export const getUsersFailure = (err) => ({
  type: USER_ACTION_TYPES.GET_USERS_FAILURE,
  payload: err,
});

// * CREATE
///////////
export const createUserRequest = (payload) => ({
  type: USER_ACTION_TYPES.CREATE_USER_REQUEST,
  payload: payload,
});

export const createUserSuccess = (data) => ({
  type: USER_ACTION_TYPES.CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserFailure = (err) => ({
  type: USER_ACTION_TYPES.CREATE_USER_FAILURE,
  payload: err,
});

// * UPDATE
///////////
export const updateUserRequest = (payload, id) => ({
  type: USER_ACTION_TYPES.UPDATE_USER_REQUEST,
  payload: payload,
  user_id: id,
});

export const updateUserSuccess = (data) => ({
  type: USER_ACTION_TYPES.UPDATE_USER_SUCCESS,
  payload: data,
});

export const updateUserFailure = (err) => ({
  type: USER_ACTION_TYPES.UPDATE_USER_FAILURE,
  payload: err,
});

// * DELETE
///////////
export const deleteUserRequest = (userId) => ({
  type: USER_ACTION_TYPES.DELETE_USER_REQUEST,
  payload: userId,
});

export const deleteUserSuccess = (userId) => ({
  type: USER_ACTION_TYPES.DELETE_USER_SUCCESS,
  payload: userId,
});

export const deleteUserFailure = (err) => ({
  type: USER_ACTION_TYPES.DELETE_USER_FAILURE,
  payload: err,
});
