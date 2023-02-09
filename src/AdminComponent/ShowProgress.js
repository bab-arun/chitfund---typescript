import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const ShowProgress = () => {
  $(document).ready(function () {
    $("#show_progress").DataTable();
  });

  /////////////
  const [schemeTotalProgressList, setSchemeTotalProgressList] = useState([]);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getSchemeDetails/totalProgress")
      .then((res) => {
        // console.log(res.data);
        setSchemeTotalProgressList(res.data);
        setLoadData(true);
      })
      .catch((err) => console.log(err));
  }, []);

  ///////////////
  const arr = schemeTotalProgressList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.schemeName}</td>
        <td>{x.numberOfUser}</td>
        <td>{x.payAmount}</td>
        <td>{x.schemeAmount}</td>
        <td>{x.collectedSchemeAmount}</td>
        <td>{x.schemeDuration + " months"}</td>
        <td>{x.startDate}</td>
        <td>{x.endDate}</td>
      </tr>
    );
  });

  ///////////////////////

  return (
    <>
      <AdminNavbar />

      <div>
        <h1 className="create_user_header">CHIT SCHEMES REPORT</h1>
        <div className="Accept_payment_table">
          {loadData && (
            <Table
              id="show_progress"
              striped
              bordered
              hover
              variant="dark"
              className="scheme_table"
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Scheme Name</th>
                  <th style={{ textAlign: "center" }}>Number Of Users</th>
                  <th style={{ textAlign: "center" }}>Installment Amount</th>
                  <th style={{ textAlign: "center" }}>Scheme Amount</th>
                  <th style={{ textAlign: "center" }}>Collected Amount</th>
                  <th style={{ textAlign: "center" }}>Scheme Duration</th>
                  <th style={{ textAlign: "center", width: "10%" }}>
                    Start Date
                  </th>
                  <th style={{ textAlign: "center", width: "10%" }}>
                    End Date
                  </th>
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
