import React, { useState } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
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
} from "../../../../components/Component";
import { UncontrolledDropdown, Button, Badge, DropdownItem, DropdownToggle, DropdownMenu, Spinner } from "reactstrap";

const Templates = () => {
  const defaultData = {
    name: "",
    description: "",
    email_content_html: "",
    email_content: "",
  };
  const [fieldData, setFieldData] = useState(defaultData);
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
      <Head title="Templates" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Templates</BlockTitle>
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
                            //TODO onSearch(e);  Function for searching templates.pending functionality!!!
                          }}
                          placeholder="Search Templates..."
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
                        <span>Add Template</span>
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
                <span className="sub-text">Name</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Description</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Email Content (HTML)</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Email Content</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-col-tools"></DataTableRow>
            </DataTableHead>
          </div>
        </Block>
      </Content>
    </>
  );
};

export default Templates;
