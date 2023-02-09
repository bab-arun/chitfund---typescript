import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { UserNavbar } from "./UserNavbar";
import axios from "axios";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
// import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { useParams } from "react-router-dom";

export const PaymentHistory = () => {
  let usercode = sessionStorage.getItem("userCode");
  const { schemeName } = useParams();

  $(document).ready(function () {
    $("#pending_history").DataTable();
  });

  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////

  const [paymentHistoryList, setPaymentHistoryList] = useState([]);

  const [val, setVal] = useState(false);
  useEffect(() => {
    let scheme = schemeName;
    if (scheme === undefined) {
      scheme = "";
    }

    axios
      .get(
        "http://localhost:8081/getUserPaymentHistoryList/paymentHistoryList",
        {
          params: {
            userCode: usercode,
            schemeName: scheme,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPaymentHistoryList(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, [schemeName, usercode]);

  /////////////////////////////////////////////////////////

  const arr = paymentHistoryList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.userId}</td>
        <td>{x.schemeId}</td>
        <td>{x.schemeAmount}</td>
        <td>{x.installmentAmount}</td>
        <td>{x.instalDate}</td>
        <td>{x.paidAmountDate}</td>
      </tr>
    );
  });

  ////////////////////////////////////////////////////////////
  return (
    <>
      <UserNavbar />

      <div>
        <h1 className="create_user_header">PAYMENT HISTORY</h1>
        <div className="history_payment_table">
          {val && (
            <Table id="pending_history" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>UserCode</th>
                  <th>Scheme Name</th>
                  <th>Scheme Amount</th>
                  <th>Paid Amount</th>
                  <th>Installment Date</th>
                  <th>Paid Date</th>
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
