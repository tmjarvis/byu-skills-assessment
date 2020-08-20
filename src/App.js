import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OrgData from "./components/OrgData";
import { Row, Col } from "react-bootstrap";
import UserData from "./components/UserData";

function App() {
  return (
    <div className="App">
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
}

export default App;
