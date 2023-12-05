import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import { Card } from "reactstrap";
import Head from "../../../layout/head/Head";
import { Modal, ModalBody } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
} from "../../../components/Component";
import UserProfileAside from "./UserProfileAside";
import { useDispatch } from "react-redux";
import { getSingleUserRequest, updateUserRequest } from "../../../services/actions/usersActions";
import { useSelector } from "react-redux";

const UserProfileRegularPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.user);
  const loginUserData = JSON.parse(localStorage.getItem("loginData"));
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [modalTab, setModalTab] = useState("1");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    status: "",
  });
  const [modal, setModal] = useState(false);

  // * Function for getting values from input fields
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // * Function for submitting data back to API server
  const submitForm = () => {
    dispatch(updateUserRequest(formData, loginUserData.id));
    setModal(false);
  };

  //* Function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();

    const nkHeaderElement = document.getElementsByClassName("nk-header")[0];

    if (nkHeaderElement) {
      window.addEventListener("load", viewChange);
      window.addEventListener("resize", viewChange);

      nkHeaderElement.addEventListener("click", () => {
        updateSm(false);
      });
    }

    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);

      if (nkHeaderElement) {
        nkHeaderElement.removeEventListener("click", () => {
          updateSm(false);
        });
      }
    };
  }, []);

  // * Function for filling values in input fields from API
  useEffect(() => {
    const profileData = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      status: userData.status,
    };
    loginUserData && setFormData(profileData);
  }, [userData, loginUserData]);

  // * Getting login user data from API
  useEffect(() => {
    dispatch(getSingleUserRequest(loginUserData.id));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <Content>
        <Card>
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <UserProfileAside updateSm={updateSm} sm={sm} />
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <BlockHead size="lg">
                <BlockBetween>
                  <BlockHeadContent>
                    <BlockTitle tag="h4">Personal Information</BlockTitle>
                    <BlockDes>
                      <p>Basic info, like your name and address, that you use on Nio Platform.</p>
                    </BlockDes>
                  </BlockHeadContent>
                  <BlockHeadContent className="align-self-start d-lg-none">
                    <Button
                      className={`toggle btn btn-icon btn-trigger mt-n1 ${sm ? "active" : ""}`}
                      onClick={() => updateSm(!sm)}
                    >
                      <Icon name="menu-alt-r"></Icon>
                    </Button>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>

              <Block>
                <div className="nk-data data-list">
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">First Name</span>
                      <span className="data-value">{userData.first_name}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Last Name</span>
                      <span className="data-value">{userData.last_name}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item">
                    <div className="data-col">
                      <span className="data-label">Email</span>
                      <span className="data-value">{userData.email}</span>
                    </div>
                    <div className="data-col data-col-end disabled">
                      <span className="data-more disabled">
                        <Icon name="lock-alt"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Status</span>
                      <span className="data-value">{userData.status}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                </div>
              </Block>

              <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
                <a
                  href="#dropdownitem"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setModal(false);
                  }}
                  className="close"
                >
                  <Icon name="cross-sm"></Icon>
                </a>
                <ModalBody>
                  <div className="p-2">
                    <h5 className="title">Update Profile</h5>
                    <ul className="nk-nav nav nav-tabs">
                      <li className="nav-item">
                        <a
                          className={`nav-link ${modalTab === "1" && "active"}`}
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModalTab("1");
                          }}
                          href="#personal"
                        >
                          Personal
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                        <Row className="gy-4">
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="full-name">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={(e) => onInputChange(e)}
                                placeholder="Enter First name*"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={(e) => onInputChange(e)}
                                placeholder="Enter Last name*"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={(e) => onInputChange(e)}
                                placeholder="Enter Email*"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Status
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={(e) => onInputChange(e)}
                                placeholder="Enter Status*"
                              />
                            </div>
                          </Col>
                          <Col size="12">
                            <div className="custom-control custom-switch">
                              <input type="checkbox" className="custom-control-input" id="latest-sale" />
                              <label className="custom-control-label" htmlFor="latest-sale">
                                Use full name to display
                              </label>
                            </div>
                          </Col>
                          <Col size="12">
                            <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                              <li>
                                <Button
                                  color="primary"
                                  size="lg"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    submitForm();
                                  }}
                                >
                                  Update Profile
                                </Button>
                              </li>
                              <li>
                                <a
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    setModal(false);
                                  }}
                                  className="link link-light"
                                >
                                  Cancel
                                </a>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileRegularPage;
