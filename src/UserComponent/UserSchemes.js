import React from "react";
import { Table } from "react-bootstrap";
import { UserNavbar } from "./UserNavbar";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const UserSchemes = () => {
  $(document).ready(function () {
    $("#user_schemes").DataTable();
  });

  return (
    <>
      <UserNavbar />

      <div>
        <h1 className="create_user_header">CHIT SCHEMES</h1>
        <div className="Accept_payment_table">
          <Table
            id="user_schemes"
            striped
            bordered
            hover
            variant="dark"
            className="scheme_table"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Scheme Name</th>
                <th>Scheme Amount</th>
                <th>Number Of Users</th>
                <th>Pay Amount</th>
                <th>Scheme Interest</th>
                <th>Scheme Duration</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>One year chit</td>
                <td>300000</td>
                <td>30</td>
                <td>3000</td>
                <td>10%</td>
                <td>12 months</td>
                <td>5-06-2022</td>
                <td>5-06-2023</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
