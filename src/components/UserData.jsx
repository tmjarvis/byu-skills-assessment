import React, { useState } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import UserDataTable from "./UserDataTable";
import { toast } from "react-toastify";
import "./dataSections.css";

const UserData = () => {
  const [renderResults, setRenderResults] = useState(false);

  const [userName, setUserName] = useState([]);

  const onChangeName = (e) => {
    setUserName(e.target.value);
  };

  const [userResults, setUserResults] = useState([]);

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
      setUserResults([]);
      setRenderResults(false);
      let PushEventsData = [];
      const response = await fetch(
        `https://api.github.com/users/${userName}/events`,
        requestOptions
      );

      const parseRes = await response.json();

      parseRes.map((event) => {
        if (event.type === "PushEvent")
          PushEventsData.push({
            eventType: event.type,
            repoName: event.repo.name,
            date: Date(event.created_at),
          });
      });

      const reposList = [];
      PushEventsData.map((event) => reposList.push(event.repoName));

      let arrayCopy = reposList.slice(0);

      // The following 2-step loop determines which Events returned are from the same repo.
      // It allows me to return the count of commits to the same repo rather than duplicate records.

      for (let index = 0; index < reposList.length; index++) {
        let myCount = 0;
        let date = PushEventsData[index].date;
        // Subloop: Go through each other object in the array and check for duplicates (the same repo name).
        // Delete duplicates from array copy and return +1 commit count for each.
        for (let subIndex = 0; subIndex < arrayCopy.length; subIndex++) {
          if (reposList[index] === arrayCopy[subIndex]) {
            myCount++;
            delete arrayCopy[subIndex];
          }
        }

        if (myCount > 0) {
          setUserResults((userResults) => [
            ...userResults,
            {
              repoName: reposList[index],
              commitCount: myCount,
              // GitHub returns Events results in reverse chronological order. No need to perform date operations here.
              mostRecent: date,
            },
          ]);
        }
      }

      setRenderResults(true);
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid Username", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div>
      <h3 className="Section-Header">User Data</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={onChangeName}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => getUserData()}>
          Search
        </Button>
      </Form>
      {renderResults === true && <UserDataTable data={userResults} />}
    </div>
  );
};

export default UserData;
