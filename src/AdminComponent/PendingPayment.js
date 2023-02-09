import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const PendingPayment = () => {
  $(document).ready(function () {
    $("#pending_payment").DataTable();
  });

  const [schemePendingPaymentList, setSchemePendingPaymentList] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/schemePaymentpendingList/schemePending")
      .then((res) => {
        console.log(res.data);
        setSchemePendingPaymentList(res.data);
        setLoadData(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = schemePendingPaymentList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.schemeName}</td>
        <td>{x.startDate}</td>
        <td>{x.endDate}</td>
        <td>{x.numberOfUser}</td>

        <td>
          <Link
            to={`/userspendingpayment/${x.id}/${x.schemeName}`}
            style={{ color: "yellow", textDecoration: "underline" }}
          >
            {x.pendingPaymentCount}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <AdminNavbar />

      <div>
        <div>
          <h1 className="create_user_header">PENDING PAYMENT</h1>
          <div className="Accept_payment_table">
            {loadData && (
              <Table
                id="pending_payment"
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
                    <th style={{ textAlign: "center" }}>Start date</th>
                    <th style={{ textAlign: "center" }}>End date</th>
                    <th style={{ textAlign: "center" }}>Number Of Users</th>
                    <th style={{ textAlign: "center" }}>
                      Pending Payment Count
                    </th>
                  </tr>
                </thead>
                <tbody>{arr}</tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
