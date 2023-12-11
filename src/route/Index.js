import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CustomerProvider } from "../pages/panel/e-commerce/customer/CustomerContext";
import LoginPage from "../pages/auth/LoginPage";
import EcomSupport from "../pages/panel/e-commerce/support/Messages";
import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import EcomCustomer from "../pages/panel/e-commerce/customer/CustomerList";
import EcomCustomerDetails from "../pages/panel/e-commerce/customer/CustomerDetails";
import EcomSettings from "../pages/panel/e-commerce/settings/Settings";
import Company from "../pages/panel/e-commerce/company/Company";
import Layout from "../layout/Index";
import CompanyRegistration from "../pages/auth/CompanyRegistration";
import ForgotPassword from "../pages/auth/ForgotPassword";
import UserProfileRegularPage from "../pages/pre-built/user-manage/UserProfileRegular";
import UserProfileSettingPage from "../pages/pre-built/user-manage/UserProfileSetting";
import UserProfileNotificationPage from "../pages/pre-built/user-manage/UserProfileNotification";
import CompanyProfileRegular from "../pages/pre-built/company-manage/CompanyProfileRegular";
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
        <Route path="/products" element={<EcomProducts />}></Route>
        <Route path="/support" element={<EcomSupport />}></Route>
        <Route path="/settings" element={<EcomSettings />}></Route>
        <Route element={<CustomerProvider />}>
          <Route path="customer" element={<EcomCustomer />}></Route>
          <Route path="customer-details/:customerId" element={<EcomCustomerDetails />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};
export default Router;
