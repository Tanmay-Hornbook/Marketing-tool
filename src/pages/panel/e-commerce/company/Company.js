import React, { useEffect, useReducer, useState } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import Moment from "react-moment";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  PreviewAltCard,
} from "../../../../components/Component";
import { UncontrolledDropdown, Button, Badge, DropdownItem, DropdownToggle, DropdownMenu, Spinner } from "reactstrap";
import Model from "../../../../components/common/Model";
import { useDispatch } from "react-redux";
import {
  createUserRequest,
  getUsersRequest,
  getSingleUserRequest,
  deleteUserRequest,
  updateUserRequest,
} from "../../../../services/actions/usersActions";
import { getRoleRequest } from "../../../../services/actions/getRoleActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Company = ({ direction }) => {
  const defaultData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    status: "Active",
    role_id: 2,
  };
  const navigateTo = useNavigate();
  const fetchedToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const usersData = useSelector((state) => state.users.users);
  const [updatedData, setUpdatedData] = useState(usersData?.data);
  const userData = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.users.loading);
  const [forceUpdate, setForceUpdate] = useState(false);
  const reg = /^[a-z.0-9]{5,}@[A-Za-z]{4,}[.]{1}[A-Za-z]{1,5}$/;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [fieldError, setFieldError] = useState("");
  const [fieldData, setFieldData] = useState(defaultData);
  const [isEdit, setIsEdit] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [smOption, setSmOption] = useState(false);
  const [view, setView] = useState({
    add: false,
  });
  const modelProps = {
    userData: userData,
    isOpenModal: view.add,
    toggleModal: () => {
      onFormCancel();
    },
    href: "#cancel",
    onClickIcon: (e) => {
      e.preventDefault();
      onFormCancel();
    },
    heading: isEdit ? "Edit User" : "Add User",
    onChangeInput: (e) => {
      handleOnChange(e);
    },
    fieldData: fieldData,
    fieldError: fieldError,
    isOpenDropdown: dropdownOpen,
    ToggleDropDown: () => {
      toggleDropdown;
    },
    direction: direction,
    role_name: "role_id",
    defaultValue: fieldData,
    isEdit: isEdit,
    onAdd: () => {
      onCreateUser();
    },
    onSave: () => {
      onUpdateUser();
    },
  };

  // * Getting All Users
  //////////////////////
  useEffect(() => {
    dispatch(getUsersRequest(currentPage));
  }, [currentPage]);

  // * Getting single user data
  /////////////////////////////
  useEffect(() => {
    if (userData) {
      setFieldData(userData);
    }
  }, [userData]);

  // * Getting total items and setting newly updated data to state
  ////////////////////////
  useEffect(() => {
    setTotalItems(usersData?.totalItems);
    setUpdatedData(usersData?.data);
  }, [usersData]);

  // * Function for getting user role
  ///////////////////////////////////
  useEffect(() => {
    const id = updatedData?.map((user) => {
      return user.role_id;
    });
    dispatch(getRoleRequest(id));
  }, [updatedData, dispatch]);

  // * Redirecting to login page if user has no token
  ///////////////////////////////////////////////////
  useEffect(() => {
    fetchedToken === null && navigateTo("/");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loginData");
  }, [fetchedToken]);

  //* Function for toggling modal
  ///////////////////////////////
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
    });
  };

  // * Function for toggling dropdown
  ///////////////////////////////////
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  //* Function for resetting form
  ///////////////////////////////
  const resetForm = () => {
    setFieldData(defaultData);
    setFieldError({});
  };

  // * Function for closing modal
  ///////////////////////////////
  const onFormCancel = () => {
    setIsEdit(false);
    setView({ add: false });
    resetForm();
  };

  // * Function for pagination
  ////////////////////////////
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //* Function for validation of data
  ///////////////////////////////////
  const validateForm = () => {
    const errors = {};

    if (fieldData.first_name === "") {
      errors.first_name = "** First Name is required";
    }

    if (fieldData.last_name === "") {
      errors.last_name = "** Last Name is required";
    }

    if (!fieldData.email.match(reg) || fieldData.email === "") {
      errors.email = "** Email is invalid";
    }

    if (fieldData.password < 8 || fieldData.password === "") {
      errors.password = "** invalid password";
    }

    return errors;
  };

  // * Function for creating a new user
  /////////////////////////////////////
  const onCreateUser = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldError({ ...fieldError, ...errors });
    } else {
      dispatch(createUserRequest(fieldData));
      if (!loading) {
        onFormCancel();
      }
    }
  };

  //* Function for getting values from inputs
  ///////////////////////////////////////////
  const handleOnChange = (e) => {
    setFieldData({ ...fieldData, [e.target.name]: e.target.value });
    setFieldError({ ...fieldError, [e.target.name]: "" });
  };

  //* Function for getting single user
  ////////////////////////////////////
  const loadDetail = (id) => {
    setIsEdit(true);
    if (id) {
      dispatch(getSingleUserRequest(id));
      toggle("add");
    }
  };

  // * Function for updating user details
  ///////////////////////////////////////
  const onUpdateUser = () => {
    dispatch(updateUserRequest(fieldData, userData.id));
    if (!loading) {
      onFormCancel();
    }
    dispatch(getUsersRequest(currentPage));
    setForceUpdate(!forceUpdate);
  };

  // * Function for deleting user
  ///////////////////////////////
  const deleteUser = (id) => {
    if (id) {
      dispatch(deleteUserRequest(id));
      if (updatedData.length < 1) {
        dispatch(getUsersRequest(currentPage - 1));
      } else {
        dispatch(getUsersRequest(currentPage));
      }
      setForceUpdate(!forceUpdate);
    }
  };

  // * Function for searching data
  ////////////////////////////////
  const onSearch = (e) => {
    const query = e.target.value;
    const filteredData = usersData?.data.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    // console.log("console_filteredData", filteredData);
    setUpdatedData(filteredData);
  };

  return (
    <>
      <Head title="Hornbook"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Users</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(e) => {
                    e.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            onSearch(e);
                          }}
                          placeholder="Search Users..."
                        />
                      </div>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          setFieldData(defaultData);
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add User</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow>
                <span className="sub-text">No.</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">User</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Date</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Status</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">E-mail</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools"></DataTableRow>
            </DataTableHead>
            {/* Data-Bars */}
            {loading ? (
              <Spinner></Spinner>
            ) : (
              updatedData?.map((item, index) => (
                <DataTableItem key={item.id}>
                  <DataTableRow>
                    <p>{item.id}</p>
                  </DataTableRow>
                  <DataTableRow>
                    <p>{`${item.first_name} ${item.last_name}`}</p>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <Moment format="YYYY-MM-DD">
                      <span>{item.date}</span>
                    </Moment>
                  </DataTableRow>
                  <DataTableRow>
                    <Badge
                      className="badge-sm badge-dot has-bg d-none d-sm-inline-flex"
                      color={item.status === "Active" ? "success" : "danger"}
                    >
                      {item.status}
                    </Badge>
                  </DataTableRow>
                  <DataTableRow size="sm">
                    <span className="tb-sub">{item.email}</span>
                  </DataTableRow>
                  <DataTableRow className="nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1">
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                    loadDetail(item.id);
                                  }}
                                >
                                  <Icon name="edit"></Icon>
                                  <span>Edit User</span>
                                </DropdownItem>
                              </li>
                              <li>
                                {role.role !== "owner" && (
                                  <DropdownItem
                                    onClick={() => {
                                      deleteUser(item.id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove User</span>
                                  </DropdownItem>
                                )}
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                  </DataTableRow>
                </DataTableItem>
              ))
            )}
          </div>
          <PreviewAltCard>
            {updatedData?.length > 0 ? (
              <PaginationComponent
                itemPerPage={6}
                totalItems={totalItems}
                paginate={(currentPage) => {
                  handlePagination(currentPage);
                }}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No Users found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Model {...modelProps} />
      </Content>
    </>
  );
};

export default Company;
