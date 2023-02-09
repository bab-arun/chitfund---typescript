import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { UserNavbar } from "./UserNavbar";
import swal from "sweetalert";

//import swal from "sweetalert";
import { useParams } from "react-router-dom";

// //Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const UpdatePayment = () => {
  let usercode = sessionStorage.getItem("userCode");
  const { schemeName } = useParams();

  $(function () {
    $("#update_payment_table").DataTable();
  });

  const [installmentList, setInstallmentList] = useState([]);

  const [val, setVal] = useState(false);
  useEffect(() => {
    let scheme = schemeName;
    if (scheme === undefined) {
      scheme = "";
    }

    axios
      .get("http://localhost:8081/getUserPaymentList/duePaymentList", {
        params: {
          userCode: usercode,
          schemeName: scheme,
        },
      })
      .then((res) => {
        console.log(res.data);
        setInstallmentList(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, [usercode, schemeName]);

  //////////////////////////////iterate table////////

  const arr = installmentList.map((x, index) => {
    return (
      <tr key={index}>
        <td>{x.userId}</td>
        <td>{x.schemeId}</td>
        <td>{x.schemeAmount}</td>
        <td>{x.installmentAmount}</td>

        <td>{x.nextInstallmentDate}</td>

        <td>{x.paymentType}</td>

        <td>
          <Button variant="primary" onClick={() => userPayment(x.id)}>
            Make Payment
          </Button>
        </td>
      </tr>
    );
  });

  ///////////////////make payment by user

  const userPayment = (id) => {
    let paymentId = id;
    console.log(paymentId);
    axios
      .get("http://localhost:8081/userPayment/payment", {
        params: {
          paymentId: paymentId,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "User Payment is Done") {
          swal({
            title: "Payment Done Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/updatepayment";
          });
        }
      })
      .catch((err) => console.log(err));
  };

  ///////////////////////////////////////////////////

  return (
    <>
      <UserNavbar />

      <div className="update_payment_box">
        <div className="update_payment_header">
          <h1 className="update_user_header">MAKE PAYMENT</h1>
        </div>

        <div className="update_payment_table">
          {val && (
            <Table
              striped
              bordered
              hover
              variant="dark"
              id="update_payment_table"
            >
              <thead>
                <tr>
                  <th>User Code</th>
                  <th>Scheme Name</th>
                  <th>Scheme Amount</th>
                  <th>Due Amount</th>
                  <th>Due Date</th>
                  <th>PaymentBy</th>
                  <th>Action</th>
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
