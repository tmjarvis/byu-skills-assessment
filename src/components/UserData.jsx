import React, { useState } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";

const UserData = () => {
  const [renderResults, setRenderResults] = useState(false);

  const [userName, setUserName] = useState([]);

  const onChangeName = (e) => {
    setUserName(e.target.value);
  };

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

  const getUserData = async function () {
    try {
      let urlsToHit = [];
      const response = await fetch(
        `https://api.github.com/users/${userName}/repos`
      );

      const parseRes = await response.json();

      parseRes.map((repo) => {
        urlsToHit.push(repo.url);
      });

      console.log("Here are the urls that you need to hit: ", urlsToHit);

      let namesAndEmails = [];

      // urlsToHit.map(async (url, index) => {
      //   const response = await fetch(`${url}`, requestOptions);
      //   const parseRes = await response.json();
      //   // console.log("Name: ", parseRes.name, "Email: ", parseRes.email);
      //   setOrgData((orgData) => [
      //     ...orgData,
      //     { name: parseRes.name, email: parseRes.email },
      //   ]);
      //   namesAndEmails.push({
      //     name: parseRes.name,
      //     email: parseRes.email,
      //   });
      // });

      // setOrgData(parseRes);
      setRenderResults(true);

      // console.log(orgName);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h3>User Data</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={onChangeName}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
        <Button variant="primary" onClick={() => getUserData()}>
          Search
        </Button>
      </Form>
    </div>
  );
};

export default UserData;
