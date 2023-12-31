import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_ACTION_TYPES } from "../actions/constants/loginActionsConstants";
import { loginSuccess, loginFailure } from "../actions/loginActions";
import { getUsersRequest } from "../actions/usersActions";
import axiosInstance from "../../utils/axiosConfig";

function* loginRequest(action) {
  return yield axiosInstance.post("api/auth/login", action);
}

function* handleLoginRequest(action) {
  try {
    let response = yield call(loginRequest, action.payload);
    const data = yield response;
    if (data.status === 200) {
      const token = `Bearer ${data.data.tokens.access.token}`;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("loginData", JSON.stringify(data.data.data));
      yield put(loginSuccess(data.data.data));
      yield put(getUsersRequest(1));
    } else {
      yield put(loginFailure("Could not login"));
    }
  } catch (err) {
    console.log("Error is", err);
  }
}

export function* watchLoginRequest() {
  yield takeLatest(LOGIN_ACTION_TYPES.LOGIN_REQUEST, handleLoginRequest);
}
