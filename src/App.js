import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OrgData from "./components/OrgData";
import { Row, Col } from "react-bootstrap";
import UserData from "./components/UserData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
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
