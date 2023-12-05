import { call, put, takeLatest } from "redux-saga/effects";
import { COMPANY_ACTION_TYPES } from "../actions/constants/companyActionConstants";
import { getCompanySuccess, getCompanyFailure } from "../actions/companyActions";
import axiosInstance from "../../utils/axiosConfig";

function* getCompanyRequest(action) {
  return yield axiosInstance.get("api/company/view", action);
}

function* handleGetCompanyRequest(action) {
  try {
    let response = yield call(getCompanyRequest, action.payload);
    const data = yield response;
    if (data.status === 200) {
      yield put(getCompanySuccess(data.data.data));
    } else {
      yield put(getCompanyFailure("Could not get company"));
    }
  } catch (err) {
    console.log("Console_error", err);
  }
}

export function* watchGetCompanyRequest() {
  yield takeLatest(COMPANY_ACTION_TYPES.GET_COMPANY_REQUEST, handleGetCompanyRequest);
}
