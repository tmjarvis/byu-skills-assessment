import React from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";

const UserDataTable = (props) => {
  return (
    <div>
      <h3 className="Data-Table-Header">Ye Olde User Table</h3>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Repo Name</th>
            <th># Commits</th>
            <th>Date of Most Recent Commit</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((repo, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{repo.repoName}</td>
              <td>{repo.commitCount}</td>
              <td>{format(new Date(repo.mostRecent), "MM/dd/yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserDataTable;
