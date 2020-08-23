import React from "react";
import { Row, Col } from "react-bootstrap";
import UserData from "./UserData";
import OrgData from "./OrgData";

const MainPage = () => {
  return (
    <div>
      <Row>
        <Col>
          <OrgData />
        </Col>
        <Col>
          <UserData />
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
