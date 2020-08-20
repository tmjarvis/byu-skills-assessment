import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DataTable from "./common/DataTable";

const OrgData = () => {
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
  myHeaders.append(
    "Authorization",
    "Bearer c42957523b8b24b7b9c65defb24e6dd2197a3723"
  );
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const getOrgData = async function () {
    try {
      let urlsToHit = [];
      const response = await fetch(
        `https://api.github.com/orgs/${orgName}/public_members`
      );

      const parseRes = await response.json();

      parseRes.map((user) => {
        urlsToHit.push(user.url);
      });

      console.log("Here are the urls that you need to hit: ", urlsToHit);

      let namesAndEmails = [];

      urlsToHit.map(async (url, index) => {
        const response = await fetch(`${url}`, requestOptions);
        const parseRes = await response.json();
        // console.log("Name: ", parseRes.name, "Email: ", parseRes.email);
        setOrgData((orgData) => [
          ...orgData,
          { name: parseRes.name, email: parseRes.email },
        ]);
        namesAndEmails.push({
          name: parseRes.name,
          email: parseRes.email,
        });
      });

      // setOrgData(parseRes);
      setRenderResults(true);

      // console.log(orgName);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Organization Data</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Organization Name"
            value={orgName}
            onChange={onChangeName}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
        <Button variant="primary" onClick={() => getOrgData()}>
          Search
        </Button>
        {renderResults === true && <DataTable data={orgData} />}
      </Form>
    </div>
  );
};

export default OrgData;
