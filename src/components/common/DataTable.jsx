import React from "react";
import { Table } from "react-bootstrap";

const DataTable = (props) => {
  console.log("Here is the data being passed to the table: ", props.data);
  if (props.data.message === "Not Found") {
    return (
      <div>
        <h3>Invalid Name</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Ye olde Data Table</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((member, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default DataTable;
