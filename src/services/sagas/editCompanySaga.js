import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_COMPANY_ACTION_TYPES } from "../actions/constants/editCompanyActionConstants";
import { editCompanySuccess, editCompanyFailure } from "../actions/editCompanyActions";
import { getCompanyRequest } from "../actions/companyActions";
import axiosInstance from "../../utils/axiosConfig";

function* editCompanyRequest(action) {
  return yield axiosInstance.put("api/company/edit", action);
}

function* handleEditCompanyRequest(action) {
  try {
    let response = yield call(editCompanyRequest, action.payload);
    const data = yield response;
    if (data.status === 200) {
      yield put(editCompanySuccess(data.data));
      yield put(getCompanyRequest());
    } else {
      yield put(editCompanyFailure("Could not update company"));
    }
  } catch (err) {
    console.log("console_error", err);
  }
}

export function* watchEditCompanyRequest() {
  yield takeLatest(EDIT_COMPANY_ACTION_TYPES.EDIT_COMPANY_REQUEST, handleEditCompanyRequest);
}
