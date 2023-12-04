import React from "react";
import "../../assets/scss/core/pages/auths/company_registration.scss";
import formLogo from "../../images/logo-dark2x.png";
import AuthFooter from "./AuthFooter";
import { useState } from "react";
import Field from "../../components/input/field/Field";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registrationRequest } from "../../services/actions/registrationActions";
import { useSelector } from "react-redux";
const CompanyRegistration = () => {
  const company = useSelector((state) => state.company.company);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [fieldError, setFieldError] = useState("");
  const [fieldData, setFieldData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    empoyee_count: "",
    url: "",
    timezone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    service_desc: "",
  });

  const reg = /^[A-Za-z0-9_]{5,}@[A-Za-z]{4,}[.]{1}[A-Za-z]{1,5}$/;

  const inputClasses = "form-control-lg form-control";

  // * Function for Form Validation
  const validateForm = () => {
    const errors = {};

    if (fieldData.first_name === "") {
      errors.first_name = "** First Name is required";
    }

    if (fieldData.last_name === "") {
      errors.last_name = "** Last Name is required";
    }

    if (!fieldData.email || !fieldData.email.match(reg) || fieldData.email === "") {
      errors.email = "** Invalid Email";
    }

    if (!fieldData.password || fieldData.password.length < 8) {
      errors.password = "** Password must be at least 8 characters";
    }

    if (fieldData.confirmPassword !== fieldData.password) {
      errors.confirmPassword = "** Confirm Password Doesn't match to Password";
    }

    if (fieldData.name === "") {
      errors.name = "** Company Name is required";
    }

    if (fieldData.empoyee_count === "") {
      errors.empoyee_count = "** Employee Count is required";
    }
    return errors;
  };

  // * Function for submitting data to the API Server
  const onCompanySubmit = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFieldError({ ...fieldError, ...errors });
    } else {
      dispatch(registrationRequest(fieldData));
      navigateTo("/");
    }
  };

  // * Function for getting values from Input fields
  const handleOnchange = (e) => {
    setFieldData({ ...fieldData, [e.target.name]: e.target.value });
    setFieldError({ ...fieldError, [e.target.name]: "" });
  };

  return (
    <>
      {console.log("console_company", company)}
      <div className="company_registration">
        <div className="company_registration_inner">
          <div className="form-logo">
            <img src={formLogo} alt="logo" />
          </div>
          <div className="form-container">
            <div className="form-inner">
              <div className="heading">
                <h3>Company Registration</h3>
              </div>
              <div className="fields">
                <div className="field">
                  <div className="field-inner">
                    <div className="field-inner-contents">
                      <div className="lside">
                        <label className="form-label">First Name :</label>
                        <Field
                          type="text"
                          value={fieldData.first_name}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="First Name*"
                          classnames={inputClasses}
                          name={"first_name"}
                        />
                        {fieldError?.first_name && <span className="invalid">{fieldError.first_name}</span>}

                        <label className="form-label">Last Name :</label>
                        <Field
                          type="text"
                          value={fieldData.last_name}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Last Name*"
                          classnames={inputClasses}
                          name={"last_name"}
                        />
                        {fieldError?.last_name && <span className="invalid">{fieldError.last_name}</span>}

                        <label className="form-label">Email :</label>
                        <Field
                          type="email"
                          value={fieldData.email}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Email Address*"
                          classnames={inputClasses}
                          name={"email"}
                        />
                        {fieldError?.email && <span className="invalid">{fieldError.email}</span>}

                        <label className="form-label">Password :</label>
                        <Field
                          type="password"
                          value={fieldData.password}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Password*"
                          classnames={inputClasses}
                          name={"password"}
                        />
                        {fieldError?.password && <span className="invalid">{fieldError.password}</span>}

                        <label className="form-label">Confirm Password :</label>
                        <Field
                          type="password"
                          value={fieldData.confirmPassword}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Password*"
                          classnames={inputClasses}
                          name={"confirmPassword"}
                        />
                        {fieldError?.confirmPassword && <span className="invalid">{fieldError.confirmPassword}</span>}

                        <label className="form-label">Company Name :</label>
                        <Field
                          type="text"
                          value={fieldData.name}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Company name*"
                          classnames={inputClasses}
                          name={"name"}
                        />
                        {fieldError?.name && <span className="invalid">{fieldError.name}</span>}

                        <label className="form-label">Employees :</label>
                        <Field
                          type="text"
                          value={fieldData.empoyee_count}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Number of Employees*"
                          classnames={inputClasses}
                          name={"empoyee_count"}
                        />
                        {fieldError?.empoyee_count && <span className="invalid">{fieldError.empoyee_count}</span>}

                        <label className="form-label">URL :</label>
                        <Field
                          type="url"
                          value={fieldData.url}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter URL*"
                          classnames={inputClasses}
                          name={"url"}
                        />
                        {fieldError?.url && <span className="invalid">{fieldError.url}</span>}
                      </div>

                      <div className="rside">
                        <label className="form-label">Timezone :</label>
                        <Field
                          type="text"
                          value={fieldData.timezone}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Timezone*"
                          classnames={inputClasses}
                          name={"timezone"}
                        />
                        {fieldError?.timezone && <span className="invalid">{fieldError.timezone}</span>}

                        <label className="form-label">Address 1 :</label>
                        <Field
                          type="text"
                          value={fieldData.address1}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Address*"
                          classnames={inputClasses}
                          name={"address1"}
                        />
                        {fieldError?.address1 && <span className="invalid">{fieldError.address1}</span>}

                        <label className="form-label">Address 2 :</label>
                        <Field
                          type="text"
                          value={fieldData.address2}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Optional Address*"
                          classnames={inputClasses}
                          name={"address2"}
                        />
                        {fieldError?.address2 && <span className="invalid">{fieldError.address2}</span>}

                        <label className="form-label">City :</label>
                        <Field
                          type="text"
                          value={fieldData.city}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter City*"
                          classnames={inputClasses}
                          name={"city"}
                        />
                        {fieldError?.city && <span className="invalid">{fieldError.city}</span>}

                        <label className="form-label">State :</label>
                        <Field
                          type="text"
                          value={fieldData.state}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter State*"
                          classnames={inputClasses}
                          name={"state"}
                        />
                        {fieldError?.state && <span className="invalid">{fieldError.state}</span>}

                        <label className="form-label">ZIP :</label>
                        <Field
                          type="text"
                          value={fieldData.zip}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter ZIP Code*"
                          classnames={inputClasses}
                          name={"zip"}
                        />
                        {fieldError?.zip && <span className="invalid">{fieldError.zip}</span>}

                        <label className="form-label">Country :</label>
                        <Field
                          type="text"
                          value={fieldData.country}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Country*"
                          classnames={inputClasses}
                          name={"country"}
                        />
                        {fieldError?.country && <span className="invalid">{fieldError.country}</span>}

                        <label className="form-label">Service Desc :</label>
                        <Field
                          type="text"
                          value={fieldData.service_desc}
                          change={(e) => {
                            handleOnchange(e);
                          }}
                          placeholder="Enter Service Desk*"
                          classnames={inputClasses}
                          name={"service_desc"}
                        />
                        {fieldError?.service_desc && <span className="invalid">{fieldError.service_desc}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-container">
                <div className="btn-inner">
                  <button className="btn btn-primary btn-lg btn-block" onClick={() => onCompanySubmit()}>
                    Register Company
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuthFooter />
      </div>
    </>
  );
};

export default CompanyRegistration;
