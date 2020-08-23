import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OrgDataTable from "./OrgDataTable";
import { toast } from "react-toastify";
import "./dataSections.css";
require("dotenv").config();

const OrgData = () => {
  const apiKey = process.env.REACT_APP_TOKEN;

  // renderResults set to true when the search button is clicked. Keeps the interface cleaner at the start.
  const [renderResults, setRenderResults] = useState(false);

  // orgName is changed by the input box.
  const [orgName, setOrgName] = useState([]);

  const onChangeName = (e) => {
    setOrgName(e.target.value);
  };

  // orgData populates with the data returned from the API pull
  const [orgData, setOrgData] = useState([]);

  // This is the data needed for the Fetch requests

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${apiKey}`);
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const getOrgData = async function () {
    try {
      setOrgData([]);
      setRenderResults(false);
      let urlsToHit = [];
      const response = await fetch(
        `https://api.github.com/orgs/${orgName}/public_members`,
        requestOptions
      );

      const parseRes = await response.json();

      parseRes.map((user) => {
        urlsToHit.push(user.url);
      });

      if (urlsToHit.length > 0) {
        urlsToHit.map(async (url, index) => {
          const response = await fetch(`${url}`, requestOptions);
          const parseRes = await response.json();
          setOrgData((orgData) => [
            ...orgData,
            {
              name: parseRes.name || "[ No name was publically provided. ]",
              email: parseRes.email || "[ No email was publically provided. ]",
              login: parseRes.login,
            },
          ]);
        });
      } else {
        setOrgData("Invalid Username");
      }

      setRenderResults(true);
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid Organization Name", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div>
      <h3 className="Section-Header">Organization Data</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Organization Name"
            value={orgName}
            onChange={onChangeName}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => getOrgData()}>
          Search
        </Button>
        {renderResults === true && <OrgDataTable data={orgData} />}
      </Form>
    </div>
  );
};

export default OrgData;
