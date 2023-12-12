import React, { useState } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import { Block, BlockHeadContent, BlockTitle, BlockBetween, BlockHead, Icon } from "../../../../components/Component";
import { UncontrolledDropdown, Button, Badge, DropdownItem, DropdownToggle, DropdownMenu, Spinner } from "reactstrap";

const Campaigns = () => {
  const [smOption, setSmOption] = useState(false);
  const [view, setView] = useState({
    add: false,
  });

  //* Function for toggling modal
  ///////////////////////////////
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
    });
  };

  return (
    <>
      <Head title="Campaigns" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Campaigns</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search" />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            //TODO onSearch(e);  Function for searching campaigns.pending functionality!!!
                          }}
                          placeholder="Search Campaigns..."
                        />
                      </div>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Campaign</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Content>
    </>
  );
};

export default Campaigns;
