import React from "react";
import { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { Card } from "reactstrap";
import UserProfileAside from "../user-manage/UserProfileAside";
import { Modal, ModalBody } from "reactstrap";
import { getCompanyRequest } from "../../../services/actions/companyActions";
import { editCompanyRequest } from "../../../services/actions/editCompanyActions";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CompanyProfileRegular = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const companyData = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    service_desc: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    url: "",
    zip: "",
  });
  const [modal, setModal] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [modalTab, setModalTab] = useState("1");
  const [sm, updateSm] = useState(false);

  // * Function for getting values from input fields
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // * Function for submitting data back to API server
  const submitForm = () => {
    dispatch(editCompanyRequest(formData));
    setModal(false);
    setForceUpdate(!forceUpdate);
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

  // * Function for getting company data from API
  useEffect(() => {
    dispatch(getCompanyRequest());
  }, [dispatch]);

  // * Function for setting values to input fields from API
  useEffect(() => {
    if (companyData) {
      setFormData(companyData);
    }
  }, [companyData]);

  return (
    <React.Fragment>
      <Head title="Company Profile"></Head>
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
                    <BlockTitle tag="h4">Company Information</BlockTitle>
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
                      <span className="data-label">Company Name</span>
                      <span className="data-value">{companyData.name}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Service Desk</span>
                      <span className="data-value">{companyData.service_desc}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Address 1</span>
                      <span className="data-value">{companyData.address1}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">Address 2</span>
                      <span className="data-value">{companyData.address2}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                  <div className="data-item" onClick={() => setModal(true)}>
                    <div className="data-col">
                      <span className="data-label">City</span>
                      <span className="data-value">{companyData.city}</span>
                    </div>
                    <div className="data-col data-col-end">
                      <span className="data-more">
                        <Icon name="forward-ios"></Icon>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="data-item" onClick={() => setModal(true)}>
                  <div className="data-col">
                    <span className="data-label">Country</span>
                    <span className="data-value">{companyData.country}</span>
                  </div>
                  <div className="data-col data-col-end">
                    <span className="data-more">
                      <Icon name="forward-ios"></Icon>
                    </span>
                  </div>
                </div>
                <div className="data-item" onClick={() => setModal(true)}>
                  <div className="data-col">
                    <span className="data-label">State</span>
                    <span className="data-value">{companyData.state}</span>
                  </div>
                  <div className="data-col data-col-end">
                    <span className="data-more">
                      <Icon name="forward-ios"></Icon>
                    </span>
                  </div>
                </div>
                <div className="data-item" onClick={() => setModal(true)}>
                  <div className="data-col">
                    <span className="data-label">URL</span>
                    <span className="data-value">{companyData.url}</span>
                  </div>
                  <div className="data-col data-col-end">
                    <span className="data-more">
                      <Icon name="forward-ios"></Icon>
                    </span>
                  </div>
                </div>
                <div className="data-item" onClick={() => setModal(true)}>
                  <div className="data-col">
                    <span className="data-label">ZIP</span>
                    <span className="data-value">{companyData.zip}</span>
                  </div>
                  <div className="data-col data-col-end">
                    <span className="data-more">
                      <Icon name="forward-ios"></Icon>
                    </span>
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
                          Company
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className={`tab-pane ${modalTab === "1" ? "active" : ""}`} id="personal">
                        <Row className="gy-4">
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="full-name">
                                Company Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={(e) => onInputChange(e)}
                                value={formData.name}
                                placeholder="Enter Company name"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Service Desk
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="service_desc"
                                onChange={(e) => onInputChange(e)}
                                value={formData.service_desc}
                                placeholder="Enter Service Desk"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Address 1
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="address1"
                                onChange={(e) => onInputChange(e)}
                                value={formData.address1}
                                placeholder="Enter Address 1"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Address 2
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="address2"
                                onChange={(e) => onInputChange(e)}
                                value={formData.address2}
                                placeholder="Enter Address 2"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="city"
                                onChange={(e) => onInputChange(e)}
                                value={formData.city}
                                placeholder="Enter City"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                Country
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="country"
                                onChange={(e) => onInputChange(e)}
                                value={formData.country}
                                placeholder="Enter Country"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                State
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="state"
                                onChange={(e) => onInputChange(e)}
                                value={formData.state}
                                placeholder="Enter State"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                URL
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="url"
                                onChange={(e) => onInputChange(e)}
                                value={formData.url}
                                placeholder="Enter URL"
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="display-name">
                                ZIP
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="zip"
                                onChange={(e) => onInputChange(e)}
                                value={formData.zip}
                                placeholder="Enter ZIP Code"
                              />
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

export default CompanyProfileRegular;
