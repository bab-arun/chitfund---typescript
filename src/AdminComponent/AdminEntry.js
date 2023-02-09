/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export const AdminEntry = () => {
  const { scheme, amount } = useParams();
  const [schemeAmount, setSchemeAmount] = useState();
  const [schemeName, setSchemeName] = useState();

  const submit = (event) => {
    event.preventDefault();
    let schemeId = event.target[0].value;
    let userId = event.target[1].value;
    let installmentAmount = event.target[2].value;
    let nextInstallmentDate = event.target[3].value;

    axios
      .post("http://localhost:8081/adminPayment/payment", {
        schemeId,
        userId,
        installmentAmount,
        nextInstallmentDate,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Admin Payment Done") {
          swal({
            text: userId,
            title: " Payment Successfully by Admin...!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/adminentry";
          });
        } else {
          swal({
            title:
              " user " + userId + " Payment for this Date is already Done...!",
            button: "ok",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //alert(" user " + userId + " Payment Successfully by Admin...!");
  };

  const [schemeNameList, setSchemeNameList] = useState([]);
  const [userCodeList, setUserCodeList] = useState([]);
  useEffect(() => {
    setSchemeAmount(amount);

    setSchemeName(scheme);

    ////////////////////////////////////////get user code list by scheme name
    axios
      .get("http://localhost:8081/getAssignedSchemeUser/userCodeList", {
        params: {
          schemeName: scheme,
        },
      })

      .then((res) => {
        console.log(res.data);
        setUserCodeList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8081/getSchemeName/schemeNameList")
      .then((res) => {
        setSchemeNameList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [amount, scheme]);

  //////////////////////////////////////////////////////////

  const getSchemeNameList = (e) => {
    let schemeName = e.target.value;
    console.log(schemeName);
    axios
      .get("http://localhost:8081/getAssignedSchemeUser/userCodeList", {
        params: {
          schemeName: schemeName,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserCodeList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/getInstallmentAmount/bySchemeName", {
        params: {
          schemeName: schemeName,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSchemeAmount(res.data);
      })
      .catch((err) => console.log(err));
  };

  //////////////////////////////////////////
  return (
    <>
      <AdminNavbar />
      <div className="Create_scheme_box">
        <form onSubmit={(event) => submit(event)}>
          <h1 className="create_chit_scheme">ADMIN ENTRY</h1>

          <div className="">
            <div className="admin_part_2">
              <label className="assign_scheme_name">Scheme name</label>
              <br></br>
              <select
                className="assign_select"
                name="schemename"
                onChange={(e) => getSchemeNameList(e)}
                required
              >
                {scheme === undefined && (
                  <option value="" selected>
                    -- Select Scheme Name--
                  </option>
                )}

                {schemeNameList.map((x) => {
                  return x === schemeName ? (
                    <option value={x} selected>
                      {x}
                    </option>
                  ) : (
                    <option value={x}>{x}</option>
                  );
                })}
              </select>
              <br></br>
              <br></br>
              <label className="assign_scheme_code">User code</label>
              <br></br>
              <select className="assign_select" required>
                <option value="" selected>
                  --Select User Code--
                </option>
                {userCodeList.map((x, index) => {
                  return (
                    <option key={index} value={x}>
                      {x}
                    </option>
                  );
                })}
              </select>{" "}
              <br></br>
              <br></br>
              <label className="assign_scheme_amount">Installment Amount</label>
              <br></br>
              <input
                type="text"
                className="assign_select"
                value={schemeAmount}
                readOnly
              ></input>
              <br></br>
              <br></br>
              <label className="installment_date_label">Installment Date</label>
              <br></br>
              <input type="date" className="payment_date_input" required />
              <br></br>
              <br></br>
            </div>

            <input
              type="submit"
              value="Payment"
              className="admin_entry_button"
            />
          </div>
        </form>
      </div>
    </>
  );
};
