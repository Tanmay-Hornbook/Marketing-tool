import { all } from "redux-saga/effects";

import {
  watchCreateUsersRequest,
  watchGetUsersRequest,
  watchUpdateUserRequest,
  watchGetSingleUserRequest,
  watchDeleteUserRequest,
} from "./userSagas";

import { watchLoginRequest } from "./loginSaga";

import { watchRegistrationRequest } from "./registrationSaga";

import { watchGetCompanyRequest } from "./companySaga";

import { watchEditCompanyRequest } from "./editCompanySaga";

import { watchGetRoleRequest } from "./getRoleSaga";

export default function* rootSaga() {
  yield all([
    watchGetUsersRequest(),
    watchCreateUsersRequest(),
    watchUpdateUserRequest(),
    watchGetSingleUserRequest(),
    watchDeleteUserRequest(),
    watchLoginRequest(),
    watchRegistrationRequest(),
    watchGetCompanyRequest(),
    watchEditCompanyRequest(),
    watchGetRoleRequest(),
  ]);
}
