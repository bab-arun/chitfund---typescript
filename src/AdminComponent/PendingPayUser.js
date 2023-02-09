/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const PendingPayUser = () => {
  const { schemeName, userCode } = useParams();

  $(document).ready(function () {
    $("#monthly_user_pending_payment").DataTable();
  });

  const [monthlyUserPendingPaymentList, setmonthlyUserPendingPaymentList] =
    useState([]);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/userMonthlyPending/userPendingPayment", {
        params: {
          userCode: userCode,
          schemeName: schemeName,
        },
      })
      .then((res) => {
        setmonthlyUserPendingPaymentList(res.data);
        setLoadData(true);
      })
      .catch((err) => console.log(err));
  }, []);

  /////////////////////////////////////////
  const arr = monthlyUserPendingPaymentList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.installmentDate}</td>
        <td>{x.status}</td>
        <td>{x.paidDate}</td>
      </tr>
    );
  });

  ////////////////////////////////////////
  return (
    <>
      <AdminNavbar />

      <div>
        <div>
          <h1 className="create_user_header">
            PENDING PAYMENTS SCHEME AND USER INFORMATION
          </h1>

          <h6 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            SCHEME NAME - {schemeName}
          </h6>

          <h6 style={{ textAlign: "center", marginTop: "20px", color: "blue" }}>
            {" "}
            USER ID - {userCode}
          </h6>
          <div className="pending_user_payment_table">
            {loadData && (
              <Table
                id="monthly_user_pending_payment"
                striped
                bordered
                hover
                variant="dark"
                className="pending_users_payment_table"
              >
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th style={{ width: "33%", textAlign: "center" }}>
                      Installment Months
                    </th>
                    <th style={{ width: "33%", textAlign: "center" }}>
                      Status
                    </th>
                    <th style={{ width: "33%", textAlign: "center" }}>
                      Paid Date
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
