import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import swal from "sweetalert";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const AcceptPayment = () => {
  $(document).ready(function () {
    $("#accept_payment").DataTable();
  });

  /////////////////accept payment list////////

  const [acceptPaymentList, setAcceptPaymentList] = useState([]);
  const [val, setVal] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/acceptPaymentList/userList")
      .then((res) => {
        console.log(res.data);
        setAcceptPaymentList(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, []);

  /////////////////////////////////////////// iterate accept payment records

  const arr = acceptPaymentList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.userName}</td>
        <td>{x.userId}</td>
        <td>{x.schemeId}</td>

        <td>{x.schemeAmount}</td>

        <td>{x.installmentAmount}</td>
        <td>{x.paidAmountDate}</td>

        <td>
          <Button variant="primary" onClick={() => acceptPayment(x.id)}>
            Accept Payment
          </Button>
        </td>
      </tr>
    );
  });
  ////////////////////////////////////////

  ///////////////////////////////accept payment

  const acceptPayment = (id) => {
    let acceptPaymentId = id;
    console.log(acceptPaymentId);
    axios
      .get("http://localhost:8081/acceptPayment/admin", {
        params: {
          paymentId: acceptPaymentId,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Payment is Accepted") {
          swal({
            title: "Payment Accepted Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/acceptpayment";
          });
        }
      })
      .catch((err) => console.log(err));
  };

  ///////////////////////////////////////////////////////////////
  return (
    <>
      <AdminNavbar />

      <div>
        <h1 className="create_user_header">ACCEPT PAYMENT</h1>
        <div className="Accept_payment_table">
          {val && (
            <Table
              id="accept_payment"
              striped
              bordered
              hover
              variant="dark"
              className="scheme_table"
            >
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th style={{ textAlign: "center" }}>User Name</th>
                  <th style={{ textAlign: "center" }}>User Code</th>
                  <th style={{ textAlign: "center" }}>Scheme Name</th>
                  <th style={{ textAlign: "center" }}>Scheme Amount</th>
                  <th style={{ textAlign: "center" }}>Pay Amount</th>
                  <th style={{ textAlign: "center" }}>Paid Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
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
