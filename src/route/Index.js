import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Company from "../pages/panel/e-commerce/company/Company";
import Layout from "../layout/Index";
import CompanyRegistration from "../pages/auth/CompanyRegistration";
import ForgotPassword from "../pages/auth/ForgotPassword";
import UserProfileRegularPage from "../pages/pre-built/user-manage/UserProfileRegular";
import UserProfileSettingPage from "../pages/pre-built/user-manage/UserProfileSetting";
import UserProfileNotificationPage from "../pages/pre-built/user-manage/UserProfileNotification";
import CompanyProfileRegular from "../pages/pre-built/company-manage/CompanyProfileRegular";
import Campaigns from "../pages/panel/e-commerce/campaigns/Campaigns";
import Templates from "../pages/panel/e-commerce/templates/Templates";
import Contacts from "../pages/panel/e-commerce/contacts/Contacts";
import Groups from "../pages/panel/e-commerce/Groups/Groups";
const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/company-registration" element={<CompanyRegistration />}></Route>
      <Route path="/reset-password" element={<ForgotPassword />}></Route>
      <Route path="/company-profile-regular" element={<CompanyProfileRegular />}></Route>
      <Route path="/user-profile-regular" element={<UserProfileRegularPage />}></Route>
      <Route path="/user-profile-setting" element={<UserProfileSettingPage />}></Route>
      <Route path="/user-profile-notification" element={<UserProfileNotificationPage />}></Route>
      <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
        <Route path="/company" element={<Company />}></Route>
        <Route path="/campaigns" element={<Campaigns />}></Route>
        <Route path="/contact" element={<Contacts />}></Route>
        <Route path="/group" element={<Groups />}></Route>
        <Route path="/template" element={<Templates />}></Route>
      </Route>
    </Routes>
  );
};
export default Router;
