import axios from "axios";
import React, { useEffect, useState } from "react";
// //Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { Table } from "react-bootstrap";
import { UserNavbar } from "./UserNavbar";

export const AvailableChit = () => {
  const [scheme, setScheme] = useState([]);
  const [val, setVal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/scheme-details/showAll")
      .then((res) => {
        console.log(res.data);
        setScheme(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, []);

  $(function () {
    $("#show_schemes").DataTable();
  });

  const arr = scheme.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.schemeName}</td>
        <td>{x.schemeAmount}</td>
        <td>{x.numberOfUser}</td>

        <td>{x.payAmount}</td>
        <td>{x.schemeDuration + " months"}</td>
        <td>{x.startDate}</td>
        <td>{x.endDate}</td>
      </tr>
    );
  });

  ////////////////////////////////////////////////////////////////////////
  return (
    <>
      <UserNavbar />

      <div>
        <h1 className="create_user_header">AVAILABLE CHIT SCHEMES</h1>

        <div className="chit_scheme_home">
          {val && (
            <Table
              id="show_schemes"
              striped
              bordered
              hover
              variant="dark"
              className="edit_scheme_table"
            >
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th style={{ textAlign: "center" }}>Scheme Name</th>
                  <th style={{ textAlign: "center" }}>Scheme Amount</th>
                  <th style={{ textAlign: "center" }}>Number Of Users</th>

                  <th style={{ textAlign: "center" }}>Installment Amount</th>

                  <th style={{ textAlign: "center" }}>Scheme Duration</th>
                  <th style={{ textAlign: "center" }}>Start Date</th>
                  <th style={{ textAlign: "center" }}>End Date</th>
                </tr>
              </thead>
              <tbody>{arr}</tbody>
            </Table>
          )}

          {/* /////////////////////////////////////////////////////////////////////// */}
        </div>
      </div>
    </>
  );
};
