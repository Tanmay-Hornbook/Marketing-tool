import React, { useState, useEffect } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import { Form, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/input/field/Field";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginRequest } from "../../services/actions/loginActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [forceUpdate, setForceUpdate] = useState(false);
  const loading = useSelector((state) => state.login.loading);
  const navigateTo = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [fieldError, setFieldError] = useState("");
  const reg = /^[A-Za-z0-9_]{5,}@[A-Za-z]{4,}[.]{1}[A-Za-z]{1,5}$/;
  const inputClasses = "form-control-lg form-control";

  // * Function for Form Validation
  const validateForm = () => {
    const errors = {};
    if (!loginData.email.match(reg) || loginData.email === "") {
      errors.email = "** Invalid email address or Email is Required";
    }

    if (loginData.password.length < 8 || loginData.password === "") {
      errors.password = "** Password must have at least 8 characters";
    }

    return errors;
  };

  // * Function for getting values from Input fields
  const handleOnchange = (e) => {
    const errors = {};
    if (e.target.name === "email") {
      if (!e.target.value.match(reg)) {
        setFieldError({ ...fieldError, ...errors, [e.target.name]: "Should Contain @" });
      }
    } else {
      setFieldError({ ...fieldError, ...errors, [e.target.name]: "" });
    }
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // * Function for submitting data to API Server
  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldError({ ...fieldError, ...errors });
    } else {
      dispatch(loginRequest(loginData));
      navigateTo("/company");
      setForceUpdate(!forceUpdate);
    }
  };

  // * Redirecting User to company dashboard if user is logged in
  const fetchedToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (fetchedToken !== null) {
      navigateTo("/company");
    } else {
      navigateTo("/");
    }
  }, [fetchedToken, navigateTo]);

  return (
    <>
      <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
            </BlockContent>
          </BlockHead>
          <Form
            className="is-alter"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            method="post"
          >
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">Email Address</label>
              </div>
              <div className="form-control-wrap">
                <Field
                  type="email"
                  value={loginData.email}
                  change={(e) => {
                    handleOnchange(e);
                  }}
                  placeholder="Enter email"
                  classnames={inputClasses}
                  name={"email"}
                />
                {fieldError?.email && (
                  <span
                    className="invalid"
                    style={{
                      color: "#ed7568",
                      fontSize: "1rem",
                      fontStyle: "italic",
                    }}
                  >
                    {fieldError.email}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Passcode
                </label>
                <Link className="link link-primary link-sm" to="/reset-password">
                  Forgot Code?
                </Link>
              </div>
              <div className="form-control-wrap">
                <Field
                  type="password"
                  value={loginData.password}
                  change={(e) => {
                    handleOnchange(e);
                  }}
                  placeholder="Enter your password"
                  classnames={inputClasses}
                  name={"password"}
                />
                {fieldError?.password && (
                  <span
                    className="invalid"
                    style={{
                      color: "#ed7568",
                      fontSize: "1rem",
                      fontStyle: "italic",
                    }}
                  >
                    {fieldError.password}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <Button
                size="lg"
                className="btn-block"
                color="primary"
                type="submit"
                disabled={loading ? !loading : false}
              >
                {loading ? <Spinner></Spinner> : "Sign in"}
              </Button>
            </div>
          </Form>
          <div className="form-note-s2 text-center pt-4">
            New on our platform? <Link to="/company-registration">Register your company</Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-4">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Google
              </a>
            </li>
          </ul>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default LoginPage;
