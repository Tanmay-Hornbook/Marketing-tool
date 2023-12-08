import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { Link } from "react-router-dom";
import { findUpper } from "../../../../utils/Utils";
const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  
  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="l" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">{loginData.email}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <UserAvatar text={findUpper(loginData.first_name + loginData.last_name)} theme="primary" />
            </div>
            <div className="user-info">
              <span className="lead-text">{loginData.first_name + " " + loginData.last_name}</span>
              <span className="sub-text">{loginData.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <Link to="/user-profile-regular">
              <LinkItem link="/user-profile-regular" icon="user-alt" onClick={() => toggle}>
                View Profile
              </LinkItem>
            </Link>
            {loginData.role === 'owner' && (
              <Link to="/company-profile-regular">
                <LinkItem link="/company-profile-regular" icon="dashboard">
                  View Company
                </LinkItem>
              </Link>
            )}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <Link to="/" onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </Link>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
