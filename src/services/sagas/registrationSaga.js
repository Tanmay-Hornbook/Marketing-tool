import { call, put, takeLatest } from "redux-saga/effects";
import { REGISTRATION_ACTION_TYPES } from "../actions/constants/registrationActionsConstants";
import { registrationSuccess, registrationFailure } from "../actions/registrationActions";
import axiosInstance from "../../utils/axiosConfig";

function* registrationRequest(action) {
  return yield axiosInstance.post("api/company", action);
}

function* handleRegistrationRequest(action) {
  try {
    let response = yield call(registrationRequest, action.payload);
    const data = yield response;
    if (data.status === 200) {
      yield put(registrationSuccess(data.data));
    } else {
      yield put(registrationFailure("Couldn't register Company"));
    }
  } catch (err) {
    console.log("Error is", err);
  }
}

export function* watchRegistrationRequest() {
  yield takeLatest(REGISTRATION_ACTION_TYPES.REGISTRATION_REQUEST, handleRegistrationRequest);
}
