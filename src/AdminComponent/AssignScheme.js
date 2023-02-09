/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { useContext } from "react";
import { ChitSchemeContext } from "../App";
import swal from "sweetalert";

export const AssignScheme = () => {
  const { linkSchemeName } = useContext(ChitSchemeContext);

  const [userCodeList, setUserCodeList] = useState([]);
  const [schemeName, setSchemeName] = useState("");

  ////////////////assignScheme Api//////////////
  const selectHandle = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUserCodeList(value);
    setSchemeName(linkSchemeName);
  };

  const assignScheme = (e) => {
    e.preventDefault();

    console.log(userCodeList);
    console.log(schemeName);

    console.log(assignScheme);
    axios
      .post("http://localhost:8081/assignUserScheme/save", {
        userCodeList,
        schemeName,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "User is Assigned for scheme") {
          swal({
            title: "New Users assigned to " + schemeName + " Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/adminhomepage";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////////////////////

  const [userlist, setUserlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/userCode-List/show", {
        params: {
          schemeName: linkSchemeName,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserlist(res.data);
      })
      .catch((err) => console.log(err));
  }, [linkSchemeName]);
  //////////////////////////////////////////
  return (
    <>
      <AdminNavbar />

      <div className="Create_scheme_box">
        <form onSubmit={(e) => assignScheme(e)}>
          <h1 className="assign_chit_scheme">ASSIGN CHIT SCHEME</h1>

          <div className="assign_scheme_part">
            <label className="assign_scheme_code">User code</label>
            <br></br>
            <select
              className="assign_multi_select"
              multiple
              onChange={selectHandle}
              required
            >
              {userlist.map((x, index) => {
                return (
                  <option key={index} value={x}>
                    {x}
                  </option>
                );
              })}
            </select>
            <br></br>
            <br></br>
            <label className="assign_scheme_name">Scheme name</label>
            <br></br>
            <input
              type="text"
              defaultValue={linkSchemeName}
              name="schemeName"
              required
              readOnly
            />
            <br></br>
            <br></br>
            <input
              type="submit"
              value="Assign Scheme"
              className="assign_button"
            />
          </div>
        </form>
      </div>
    </>
  );
};
