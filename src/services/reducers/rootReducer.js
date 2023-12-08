import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersReducers";
import loginReducer from "./loginReducer";
import registrationReducer from "./registrationReducer";
import companyReducer from "./companyReducer";
import editCompanyReducer from "./editCompanyReducer";
import getRoleReducer from "./getRoleReducer";
const rootReducer = combineReducers({
  users: usersReducer,
  login: loginReducer,
  registration: registrationReducer,
  company: companyReducer,
  editCompany: editCompanyReducer,
  role: getRoleReducer,
});

export default rootReducer;
