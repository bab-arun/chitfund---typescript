import React from "react";
import { UserNavbar } from "./UserNavbar";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const UserHomepage = () => {
  const [val, setVal] = useState(false);
  $(function () {
    $("#show_schemes").DataTable();
  });
  // get api for user table

  const [scheme, setScheme] = useState([]);

  let usercode = sessionStorage.getItem("userCode");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getschemedetails/user", {
        params: {
          userCode: usercode,
        },
      })
      .then((res) => {
        console.log(res.data);
        setScheme(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, [usercode]);

  const arr = scheme.map((x, index) => {
    return (
      <tr key={index}>
        {/* <td>{x.id}</td> */}
        <td style={{ textAlign: "center" }}>{x.schemeName}</td>
        <td style={{ textAlign: "center" }}>{x.schemeAmount}</td>
        <td style={{ textAlign: "center" }}>{x.numberOfUser}</td>
        <td style={{ textAlign: "center" }}>{x.payAmount}</td>
        <td style={{ textAlign: "center" }}>{x.schemeDuration}</td>
        <td style={{ textAlign: "center" }}>{x.startDate}</td>
        <td style={{ textAlign: "center" }}>{x.endDate}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/updatepayment/${x.schemeName}`}>MAKE PAYMENT</Link>
        </td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/paymenthistory/${x.schemeName}`}>PAYMENT HISTORY</Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <UserNavbar />

      <div>
        <h1 className="create_user_header">USER CHIT SCHEMES</h1>
        <div className="userHome_scheme_table">
          {val && (
            <Table
              id="show_schemes"
              striped
              bordered
              hover
              variant="dark"
              className="scheme_table"
            >
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th style={{ textAlign: "center" }}>Scheme Name</th>
                  <th style={{ textAlign: "center" }}>Scheme Amount</th>
                  <th style={{ textAlign: "center" }}>Number Of Users</th>
                  <th style={{ textAlign: "center" }}>Pay Amount</th>

                  <th style={{ textAlign: "center" }}>Scheme Duration</th>
                  <th style={{ textAlign: "center" }}>Start Date</th>
                  <th style={{ textAlign: "center" }}>End Date</th>
                  <th style={{ textAlign: "center" }}>Make Payment</th>
                  <th style={{ textAlign: "center" }}>Payment History</th>
                </tr>
              </thead>
              <tbody>{arr}</tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};
