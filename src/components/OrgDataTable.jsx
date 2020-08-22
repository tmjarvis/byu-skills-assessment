import React from "react";
import { Table } from "react-bootstrap";

const OrgDataTable = (props) => {
  return (
    <div>
      <h3 className="Data-Table-Header">Ye olde Data Table</h3>
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
              <td>{member.login}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrgDataTable;
