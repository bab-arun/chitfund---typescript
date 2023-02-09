/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const UsersPendingPayment = () => {
  const { schemeId, schemeName } = useParams();

  $(document).ready(function () {
    $("#scheme_user_pending_payment").DataTable();
  });

  const [schemeUserPendingPaymentList, setSchemeUserPendingPaymentList] =
    useState([]);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/schemeUserPendingPayment/schemeUser", {
        params: {
          schemeId: schemeId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSchemeUserPendingPaymentList(res.data);
        setLoadData(true);
      })
      .catch((err) => console.log(err));
  }, []);

  /////////////////////////////////////////
  const arr = schemeUserPendingPaymentList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.userCode}</td>
        <td>
          {" "}
          <Link
            to={`/pendingpayuser/${schemeName}/${x.userCode}`}
            style={{ color: "yellow", textDecoration: "underline" }}
          >
            {x.pendingPaymentCount}
          </Link>
        </td>
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
            PENDING PAYMENTS SCHEME INFORMATION
          </h1>

          <h6 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            SCHEME NAME - {schemeName}{" "}
          </h6>
          <div className="pending_user_payment_table">
            {loadData && (
              <Table
                id="scheme_user_pending_payment"
                striped
                bordered
                hover
                variant="dark"
                className="pending_users_payment_table"
              >
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th style={{ width: "50%", textAlign: "center" }}>User</th>
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
