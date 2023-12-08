import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ROLE_ACTION_TYPES } from "../actions/constants/getRoleActionConstants";
import { getRoleSuccess, getRoleFailure } from "../actions/getRoleActions";
import axiosInstance from "../../utils/axiosConfig";

function* getRoleRequest(action) {
  return yield axiosInstance.get(`api/role/view/${action.userId}`, action?.payload);
}

function* handleGetRoleRequest(action) {
  try {
    const response = yield call(getRoleRequest, action);
    const data = yield response;
    if (data.status === 200) {
      yield put(getRoleSuccess(data.data.data));
    } else {
      yield put(getRoleFailure("could not get role"));
    }
  } catch (err) {
    console.log("console_error", err);
  }
}

export function* watchGetRoleRequest() {
  yield takeLatest(GET_ROLE_ACTION_TYPES.GET_ROLE_REQUEST, handleGetRoleRequest);
}
