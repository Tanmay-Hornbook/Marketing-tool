import React from "react";
import Field from "../input/field/Field";
import { Icon, Row, Col } from "../../components/Component";
import { Button, Modal, ModalBody, Dropdown, Input, Spinner } from "reactstrap";
import { useSelector } from "react-redux";

const Model = ({
  userData,
  // addForm,
  //* Modal
  /////////////////////
  isOpenModal,
  toggleModal,

  // * ModalBody
  ///////////////////
  // ! Anchor tag
  href,

  // * Icon Component
  //////////////////
  onClickIcon,

  // * Modal Table
  ////////////////
  heading,
  fieldData,
  fieldError,
  onChangeInput,

  // * Dropdown
  /////////////
  isOpenDropdown,
  ToggleDropDown,
  direction,

  // * Buttons
  ////////////
  isEdit,
  onAdd,
  onSave,
}) => {
  const styles = {
    color: "#f24355",
    fontStyle: "italic",
    fontSize: "1rem",
  };
  const loading = useSelector((state) => state.users.loading);
  return (
    <>
      <Modal isOpen={isOpenModal} toggle={toggleModal} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a href={href} className="close">
            <Icon name="cross-sm" onClick={(e) => onClickIcon(e)}></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">{heading}</h5>
            <div className="mt-4">
              <Row className="g-3">
                <Col md="12">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <Field
                        type="text"
                        className="form-control"
                        change={(e) => {
                          onChangeInput(e);
                        }}
                        name="first_name"
                        value={fieldData?.first_name}
                        defaultValue={fieldData?.first_name}
                        placeholder="Enter first name*"
                        label="First Name"
                      />
                      {fieldError?.first_name && (
                        <span className="invalid" style={styles}>
                          {fieldError.first_name}
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <Field
                        type="text"
                        className="form-control"
                        change={(e) => {
                          onChangeInput(e);
                        }}
                        name="last_name"
                        value={fieldData.last_name}
                        placeholder="Enter last name*"
                        label="Last name"
                      />
                      {fieldError?.last_name && (
                        <span className="invalid" style={styles}>
                          {fieldError.last_name}
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <Field
                        type="email"
                        className="form-control"
                        change={(e) => {
                          onChangeInput(e);
                        }}
                        name="email"
                        value={fieldData.email}
                        disabled={isEdit && userData.role_id === 1 ? true : false}
                        placeholder={isEdit ? "Email is not editable*" : "Enter email"}
                        label="Email"
                      />
                      {fieldError?.email && (
                        <span className="invalid" style={styles}>
                          {fieldError.email}
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <Field
                        type="password"
                        className="form-control"
                        change={(e) => {
                          onChangeInput(e);
                        }}
                        name="password"
                        value={fieldData.password}
                        placeholder={isEdit && userData.role_id === 1 ? "Password is not editable*" : "Enter Password*"}
                        label="Password"
                        disabled={isEdit && userData.role_id === 1 ? true : false}
                      />
                      {fieldError?.password && (
                        <span className="invalid" style={styles}>
                          {fieldError.password}
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <label>Select Status</label>
                  <Col className="py-2">
                    <Input
                      type="select"
                      name="status"
                      onChange={(e) => {
                        onChangeInput(e);
                      }}
                      value={fieldData.status}
                      disabled={isEdit && userData.role_id === 1 ? true : false}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Offline">Offline</option>
                    </Input>
                  </Col>
                </Col>
                <>
                  <label>Select A Role</label>
                  <div className="d-flex py-4">
                    <Dropdown
                      isOpen={isOpenDropdown}
                      toggle={() => {
                        ToggleDropDown();
                      }}
                      direction={direction}
                    >
                      <Col>
                        <Input
                          type="select"
                          name="role_id"
                          onChange={(e) => {
                            onChangeInput(e);
                          }}
                          value={fieldData.role_id}
                          disabled={isEdit && userData.role_id === 1 ? true : false}
                          required
                        >
                          <option value={2}>Admin</option>
                          <option value={3}>Manager</option>
                        </Input>
                      </Col>
                    </Dropdown>
                  </div>
                </>
                <Col size="12">
                  <Col md="6">
                    {!isEdit ? (
                      <Button
                        color="primary"
                        onClick={() => {
                          onAdd();
                        }}
                      >
                        <span>Add User</span>
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        disabled={loading ? loading : false}
                        onClick={() => {
                          onSave();
                        }}
                      >
                        <span>{loading ? <Spinner></Spinner> : "Save"}</span>
                      </Button>
                    )}
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Model;
