import { call, put, takeLatest } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "../actions/constants/userActionConstants";

import {
  getUsersSuccess,
  getUsersRequest,
  getUsersFailure,
  createUserSuccess,
  createUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  getSingleUserSuccess,
  getSingleUserFailure,
} from "../actions/usersActions";
import axiosInstance from "../../utils/axiosConfig";

// * GET All USERS
//////////////
function* getUsersFromAPI(action) {
  return yield axiosInstance.get(`api/company/user/getall?page=${action}&limit=6`, action);
}

function* handleGetUsersRequest(action) {
  try {
    let response = yield call(getUsersFromAPI, action.payload);
    const data = yield response;
    if (data.status) {
      yield put(getUsersSuccess(data.data.data));
    } else {
      yield put(getUsersFailure("API request failed"));
    }
  } catch (err) {
    console.log("Error is", err);
    yield put(getUsersFailure(err));
  }
}

export function* watchGetUsersRequest() {
  yield takeLatest(USER_ACTION_TYPES.GET_USERS_REQUEST, handleGetUsersRequest);
}

// * GET SINGLE USER
////////////////////
function* getSingleUserRequest(action) {
  return yield axiosInstance.get(`api/company/user/view/${action}`, action);
}

function* handleGetSingleUserRequest(action) {
  try {
    let response = yield call(getSingleUserRequest, action.payload);
    const data = yield response;
    if (data.status) {
      yield put(getSingleUserSuccess(data.data.data));
    } else {
      yield put(getSingleUserFailure("Couldn't get user"));
    }
  } catch (err) {
    console.log("Error is", err);
  }
}

export function* watchGetSingleUserRequest() {
  yield takeLatest(USER_ACTION_TYPES.GET_ONE_USER_REQUEST, handleGetSingleUserRequest);
}

// * CREATE USERS
/////////////////
function* createUserRequest(action) {
  return yield axiosInstance.post("api/company/user/create", action);
}

function* handleCreateUserRequest(action) {
  try {
    let response = yield call(createUserRequest, action.payload);
    const data = yield response;

    if (data.status) {
      yield put(createUserSuccess(data.data.data));
      yield put(getUsersRequest(1));
    } else {
      yield put(createUserFailure("Can't Create user"));
    }
  } catch (err) {
    console.log("Error is", err);
  }
}

export function* watchCreateUsersRequest() {
  yield takeLatest(USER_ACTION_TYPES.CREATE_USER_REQUEST, handleCreateUserRequest);
}

// * EDIT USERS
///////////////
function* updateUserRequest(action) {
  return yield axiosInstance.put(`api/company/user/edit/${action.user_id}`, action?.payload);
}

function* handleUpdateUserRequest(action) {
  try {
    let response = yield call(updateUserRequest, action);
    const data = yield response;
    if (data.status === 200) {
      yield put(updateUserSuccess(data));
      yield put(getUsersRequest(1));
    } else {
      yield put(updateUserFailure("Couldn't update user"));
    }
  } catch (err) {
    console.log("Error is", err);
  }
}

export function* watchUpdateUserRequest() {
  yield takeLatest(USER_ACTION_TYPES.UPDATE_USER_REQUEST, handleUpdateUserRequest);
}

// * DELETE USERS
/////////////////
function* deleteUserRequest(action) {
  return yield axiosInstance.delete(`api/company/user/delete/${action.payload}`, action);
}

function* handleDeleteUserRequest(action) {
  try {
    let response = yield call(deleteUserRequest, action);
    const data = yield response;
    if (data.status === 200) {
      yield put(deleteUserSuccess(data));
    } else {
      yield put(deleteUserFailure("Couldn't delete user"));
    }
  } catch (err) {
    console.log("Error is", err);
  }
}

export function* watchDeleteUserRequest() {
  yield takeLatest(USER_ACTION_TYPES.DELETE_USER_REQUEST, handleDeleteUserRequest);
}
