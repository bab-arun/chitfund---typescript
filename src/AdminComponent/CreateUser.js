/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { AdminNavbar } from "./AdminNavbar";
import { Dialog, DialogContent, DialogTitle, Divider, Typography, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import swal from "sweetalert";
import { ButtonMui } from "../components/ButtonMui";
import { TextFieldMUi } from "../components/TextFieldMui";
import { AutoCompleteDropdown } from "../components/AutoCompleteDropdown";

// role
const role = [
  {
    id: 0,
    name: "admin",
  },
  {
    id: 1,
    name: "user"
  },
]


export const CreateUser = () => {
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  console.log({
    userCode,
    userPassword,
    userEmail,
    userMobile,
    userAddress,
    userRole,
  });

  //for validation

  const [userNameErr, setUserNameErr] = useState();
  const [userCodeErr, setUserCodeErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [mobileErr, setMobileErr] = useState();
  const [roleErr, setRoleErr] = useState('');

  /////////////////create user api call
  const createUserApi = (e) => {
    e.preventDefault();
    if (userRole === '') {
      setRoleErr("Role is required");
    }

    if (userNameErr === true || userCodeErr === true || passwordErr === true || emailErr === true || mobileErr !== '' || roleErr !== '') {
      return
    }
    axios
      .post("http://localhost:8081/user-details/save", {
        userCode: userCode,
        userName: userName,
        password: userPassword,
        email: userEmail,
        mobile: userMobile,
        address: userAddress,
        role: userRole,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "User Record Saved Successfully") {
          swal({
            text: userCode,
            title: " Saved Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///////////////////////////edit user api////////////////
  const editUserApi = (e) => {
    e.preventDefault();
    let id = e.target[0].value;
    let userName = e.target[1].value;
    let userCode = e.target[2].value;
    let password = e.target[3].value;
    let email = e.target[4].value;
    let mobile = e.target[5].value;
    let address = e.target[6].value;
    let role = e.target[7].value;


    console.log({
      id,
      userName,
      userCode,
      password,
      email,
      mobile,
      address,
      role,
    });
    axios
      .post("http://localhost:8081/user-details/save", {
        id,
        userName,
        userCode,
        password,
        email,
        mobile,
        address,
        role,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "User Record Saved Successfully") {
          swal({
            title: "Edit User Saved Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////// jquery for pagination,searching,sorting
  $(function () {
    $("#create_user").DataTable();
  });

  /////////////delete user api call
  function deleteUser(id) {
    axios
      .get(`http://localhost:8081/user-details/delete/ ${id}`)
      .then((res) => {
        console.log(res);
        if (res.data === "User record deleted") {
          swal({
            title: " User Deleted Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((err) => console.log(err));
  }

  ///////////////////////////////////////////////
  const [create, setCreate] = useState(false);

  const handleClose = () => setCreate(false);
  const handleShow = () => setCreate(true);

  const [edit, setEdit] = useState(false);

  const handClose = () => setEdit(false);
  const [selectedData, setSelectedData] = useState({});

  const handShow = (selectedRec) => {
    console.log(selectedRec.role,"editrole");
    setSelectedData(selectedRec);
    setUserRole(selectedRec.role);
    if(userRole !== null && userRole !== ''){
      setEdit(true);
    }
    
    
  };



  // for username validation
  const userNameHandler = (e) => {
    setUserName(e.target.value);
    const username = e.target.value;
    const validUserName = /^[A-Za-z ]+$/;
    if (username === '' || username === null) {
      setUserNameErr(false);
    }
    else if (validUserName.test(username)) {
      setUserNameErr(false);
    } else {
      setUserNameErr(true);
    }
  };

  const userNameHider = () => {
    setUserNameErr(false);
  }


  // usercode validation
  const userCodeHandler = (e) => {
    setUserCode(e.target.value);
    const usercode = e.target.value;
    if (usercode !== '' && usercode !== null) {

      axios
        .get("http://localhost:8081/checkDupilcateUserCode", {
          params: {
            userCode: e.target.value,
          },
        })
        .then((response) => {
          if (response.data === "userCode exist") {
            swal({
              title: "Exist UserCode",
              button: "ok",
              icon: "warning",
              dangerMode: true,
            });
            setUserCode("");
          }
        });
    }

    const validUserCode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (usercode === '' || usercode === null) {
      setUserCodeErr(false);
    }
    else if (validUserCode.test(usercode)) {
      setUserCodeErr(false);
    } else {
      setUserCodeErr(true);
    }
  };

  const userCodeHider = () => {
    setUserCodeErr(false);
  }
  // password validation
  const passwordHandler = (e) => {
    setUserPassword(e.target.value);
    const userPsw = e.target.value;
    const validPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (userPsw === '' || userPsw === null) {
      setPasswordErr(false);
    }
    else if (validPassword.test(userPsw)) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
  };

  const passwordHider = () => {
    setPasswordErr(false);
  }

  // Email validation
  const emailHandler = (e) => {
    setUserEmail(e.target.value);
    const useremail = e.target.value;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (useremail === '' || useremail === null) {
      setEmailErr(false);
    }
    else if (validEmail.test(useremail)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

  const emailHider = () => {
    setEmailErr(false);
  }

  // Mobile validation
  const mobileHandler = (e) => {

    const userPhone = e.target.value.slice(0, 10);
    console.log(userPhone.length, "userPhone")
    // if (userPhone !== '' && userPhone.length === 10) {
    //     const firstDigit = userPhone.charAt(0);
    //     const digits = ["6", "7", "8", "9"];
    //     const result = digits.includes(firstDigit);
    //     if (result) {
    //       setMobileErr("");
    //     }
    //     else {
    //       setMobileErr('Telephone is start with 6,7,8,9');
    //     }
    //   }
    //   else if(e.target.value === '') {
    //     setMobileErr('');
    //   }
    //   else{
    //     setMobileErr('Telephone no should be 10 numbers');
    //   }
    setUserMobile(userPhone);
  };

  const mobileValidation = () => {
    if (userMobile !== '' && userMobile.length === 10) {
      const firstDigit = userMobile.charAt(0);
      const digits = ["6", "7", "8", "9"];
      const result = digits.includes(firstDigit);
      if (result) {
        setMobileErr("");
      }
      else {
        setMobileErr('Telephone is start with 6,7,8,9');
      }
    }
    else if (userMobile === '') {
      setMobileErr('');
    }
    else {
      setMobileErr('Telephone no should be 10 numbers');
    }
  }

  const mobileHider = () => {
    setMobileErr('');
  }

  // adresss validation

  const addressHandler = (e) => {
    setUserAddress(e.target.value);
  };


  // Role validation
  const handleRole = (event, value) => {
    console.log(value.id, value.name, "role")
    setUserRole(value.name);
    setRoleErr('');
  }


  ////////////////////////////////////////////////////

  // get api for user table

  const [user, setUser] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/user-details/showAll")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoadData(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = user.map((x) => {
    return (
      <tr key={x.id}>
        {/* <td>{x.id}</td> */}
        <td>{x.userCode}</td>
        <td>{x.userName}</td>
        <td>{x.password}</td>
        <td>{x.email}</td>
        <td>{x.mobile}</td>
        <td>{x.address}</td>
        <td>{x.role}</td>
        <td>
          <button className="User_edit_button" onClick={() => handShow(x)}>
            Edit
          </button>

          <button className="User_del_button" onClick={() => deleteUser(x.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <AdminNavbar />

      <h1 className="create_user_header">User Details</h1>

      <div className="admin_create_user_button">
        <Button variant="success" onClick={handleShow}>
          Create User
        </Button>
      </div>

      <div className="user_table">
        {loadData && (
          <Table id="create_user" striped bordered hover variant="dark">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th style={{ textAlign: "center" }}>User Code</th>
                <th style={{ textAlign: "center" }}>User Name</th>
                <th style={{ textAlign: "center" }}>Password</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Mobile</th>
                <th style={{ textAlign: "center" }}>Address</th>
                <th style={{ textAlign: "center" }}>Role</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>{arr}</tbody>
          </Table>
        )}

        {/* modal popup for create user */}

        {/* <Modal
          show={create}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form
              onSubmit={(e) => createUserApi(e)}
              className="create_user_form"
            >
              <label className="User_form_label">User Name</label>
              <br></br>
              <input
                value={userName}
                type="text"
                className=""
                required
                autoFocus
                onChange={userNameHandler}
              />{" "}
              <br></br>
              {userNameErr ? (
                <spa style={{ color: "red" }}>*Only alphabets</spa>
              ) : null}
              <br></br>
              <label className="User_form_label">User Code</label>
              <br></br>
              <input
                value={userCode}
                type="text"
                className=""
                required
                onChange={userCodeHandler}
              />{" "}
              <br></br>
              {userCodeErr ? (
                <spa style={{ color: "red" }}>*Only email format</spa>
              ) : null}
              <br></br>
              <label className="User_form_label_password">Password</label>
              <br></br>
              <input
                value={userPassword}
                type="text"
                className=""
                required
                onChange={passwordHandler}
              />{" "}
              <br></br>
              {passwordErr ? (
                <spa style={{ color: "red" }}>
                  *Use upper,lower,special and numeric characters
                </spa>
              ) : null}
              <br></br>
              <label className="User_form_label_email">Email</label>
              <br></br>
              <input
                value={userEmail}
                type="text"
                className=""
                required
                onChange={emailHandler}
              />{" "}
              <br></br>
              {emailErr ? (
                <spa style={{ color: "red" }}>*only email format</spa>
              ) : null}
              <br></br>
              <label className="User_form_label_mobile">Mobile</label>
              <br></br>
              <input
                value={userMobile}
                type="text"
                className=""
                required
                onChange={mobileHandler}
              />
              <br></br>
              {mobileErr ? (
                <spa style={{ color: "red" }}>
                  *only 10 digits number format
                </spa>
              ) : null}
              <br></br>
              <label className="User_form_label_address">Address</label>
              <br></br>
              <input
                value={userAddress}
                type="text"
                className=""
                required
                onChange={addressHandler}
              />
              <br></br>
              {addressErr ? (
                <spa style={{ color: "red" }}>*Must not Empty</spa>
              ) : null}
              <br></br>
              <label className="role_name">Role</label>
              <br></br>
              <select
                value={userRole}
                className="role_select"
                required
                onChange={roleHandler}
              >
                <option>---Select role---</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <br></br>
              <br></br>
              <input type="submit" value="Create User" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}

        <Dialog open={create} fullWidth maxWidth="md">
          <DialogTitle>
            <Typography variant="h6s" sx={{ mb: 15, color: '#000', fontWeight: 'bold' }} divider>
              Create User
            </Typography>
            <IconButton sx={{ float: 'right' }} onClick={handClose}>
              <CloseIcon />
            </IconButton>
            <Divider variant="fullWidth" sx={{ mt: 2, borderColor: '#D0D0D0' }} />
          </DialogTitle>
          <DialogContent

          >
            <form
              onSubmit={(e) => createUserApi(e)}
              className="create_user_form"
            >
              <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="User Name"
                    // value={userName}
                    onBlur={userNameHandler}
                    onFocus={userNameHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {userNameErr ? (
                    <spa style={{ color: "red" }}>*Only alphabets</spa>
                  ) : null}
                  <br></br>

                </Grid>

                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="User Code"
                    // value={userCode}
                    onBlur={userCodeHandler}
                    onFocus={userCodeHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {userCodeErr ? (
                    <spa style={{ color: "red" }}>*Only email format</spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="Password"
                    // value={userPassword}
                    onBlur={passwordHandler}
                    onFocus={passwordHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {passwordErr ? (
                    <spa style={{ color: "red" }}>
                      *Use upper,lower,special and numeric characters
                    </spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="Email"
                    // value={userEmail}
                    onBlur={emailHandler}
                    onFocus={emailHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {emailErr ? (
                    <spa style={{ color: "red" }}>*only email format</spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>
                  <TextFieldMUi
                    variant="outlined"
                    label="Mobile"
                    value={userMobile}
                    onChange={mobileHandler}
                    onBlur={mobileValidation}
                    onFocus={mobileHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {mobileErr !== '' ? (
                    <spa style={{ color: "red" }}>
                      {mobileErr}
                    </spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="Address"
                    value={userAddress}
                    onChange={addressHandler}
                    required
                    autoFocus
                  />
                  <br></br>
                  <br></br>
                </Grid>
                <Grid item xs={4}>
                  {/* <label className="role_name">Role</label>
                  <br></br>
                  <select
                    value={userRole}
                    className="role_select"
                    required
                    onChange={roleHandler}
                  >
                    <option>---Select role---</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select> */}
                  <AutoCompleteDropdown
                    label="Role"
                    sx={{ width: "220px", marginLeft: "30px", height: '50px' }}
                    onChange={handleRole}
                    size={''}
                    value={role.find((option) => option.name === userRole)}
                    options={role}
                    getOptionLabel={(role) => `${role.name}`}
                    errorMessage={''}
                  />
                  {roleErr !== '' ? (
                    <spa style={{ color: "red" }}>
                      {roleErr}
                    </spa>
                  ) : null}
                  <br></br>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" sx={{ mt: 2, borderColor: '#D0D0D0' }} />
              <Grid container spacing={2} sx={{ mt: 2 }} >
                <Grid item xs={6}>

                  <ButtonMui
                    sx={{
                      background: "black",
                      color: "white",
                      marginRight: "400px"
                    }}
                    variant="contained"
                    label="Cancel"
                    onClick={handleClose}
                  />
                </Grid>
                <Grid container item xs={6} display="flex" justifyContent="flex-end" alignItems="flex-end">

                  <ButtonMui
                    sx={{
                      background: "black",
                      color: "white",
                    }}
                    type="submit"
                    variant="contained"
                    label="Add User"
                  />


                </Grid>

              </Grid>

            </form>
          </DialogContent>
        </Dialog>

        {/* end of create form */}

        {/***************modal popup for edit*************/}

        {/* <Modal
          show={edit}
          onHide={handClose}
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form
              onSubmit={(e) => {
                editUserApi(e);
              }}
              className="create_user_form"
            >
              <input
                type="hidden"
                className=""
                defaultValue={selectedData.id}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_name">User Name</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.userName}
                required
                readOnly
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_code">User Code</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.userCode}
                required
                readOnly
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_password">Password</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.password}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_email">Email</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.email}
                readOnly
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_mobile">Mobile</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.mobile}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_address">Address</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.address}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_role">Role</label>
              <br></br>
              <input
                type="text"
                defaultValue={selectedData.role}
                required
                readOnly
              />{" "}
              <br></br>
              <br></br>
              <input type="submit" value="Submit" className="edit_submit" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}


        <Dialog open={edit} fullWidth maxWidth="md">
          <DialogTitle>
            <Typography variant="h6s" sx={{ mb: 15, color: '#000', fontWeight: 'bold' }} divider>
              Edit User
            </Typography>
            <IconButton sx={{ float: 'right' }} onClick={handClose}>
              <CloseIcon />
            </IconButton>
            <Divider variant="fullWidth" sx={{ mt: 2, borderColor: '#D0D0D0' }} />
          </DialogTitle>
          <DialogContent

          >
            <form
              onSubmit={(e) => {
                editUserApi(e);
              }}
              className="create_user_form"
            >
              <Grid container spacing={2} sx={{ mt: 2, mb: 1 }}>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="User Name"
                    defaultValue={selectedData.userName}
                    onBlur={userNameHandler}
                    onFocus={userNameHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {userNameErr ? (
                    <spa style={{ color: "red" }}>*Only alphabets</spa>
                  ) : null}
                  <br></br>

                </Grid>

                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="User Code"
                    defaultValue={selectedData.userCode}
                    onBlur={userCodeHandler}
                    onFocus={userCodeHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {userCodeErr ? (
                    <spa style={{ color: "red" }}>*Only email format</spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="Password"
                    defaultValue={selectedData.password}
                    onBlur={passwordHandler}
                    onFocus={passwordHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {passwordErr ? (
                    <spa style={{ color: "red" }}>
                      *Use upper,lower,special and numeric characters
                    </spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="Email"
                    defaultValue={selectedData.email}
                    onBlur={emailHandler}
                    onFocus={emailHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {emailErr ? (
                    <spa style={{ color: "red" }}>*only email format</spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>
                  <TextFieldMUi
                    variant="outlined"
                    label="Mobile"
                    defaultValue={selectedData.mobile}
                    onChange={mobileHandler}
                    onBlur={mobileValidation}
                    onFocus={mobileHider}
                    required
                    autoFocus
                  />
                  <br></br>
                  {mobileErr !== '' ? (
                    <spa style={{ color: "red" }}>
                      {mobileErr}
                    </spa>
                  ) : null}
                  <br></br>
                </Grid>
                <Grid item xs={4}>

                  <TextFieldMUi
                    variant="outlined"
                    label="Address"
                    defaultValue={selectedData.address}
                    onChange={addressHandler}
                    required
                    autoFocus
                  />
                  <br></br>
                  <br></br>
                </Grid>
                <Grid item xs={4}>
                  {/* <label className="role_name">Role</label>
          <br></br>
          <select
            value={userRole}
            className="role_select"
            required
            onChange={roleHandler}
          >
            <option>---Select role---</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}
                  <AutoCompleteDropdown
                    label="Role"
                    sx={{ width: "220px", marginLeft: "30px", height: '50px' }}
                    onChange={handleRole}
                    size={''}
                    value={role.find((option) => option.name === userRole)}
                    options={role}
                    getOptionLabel={(role) => `${role.name}`}
                    errorMessage={''}
                  />
                  {roleErr !== '' ? (
                    <spa style={{ color: "red" }}>
                      {roleErr}
                    </spa>
                  ) : null}
                  <br></br>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" sx={{ mt: 2, borderColor: '#D0D0D0' }} />
              <Grid container spacing={2} sx={{ mt: 2 }} >
                <Grid item xs={6}>

                  <ButtonMui
                    sx={{
                      background: "black",
                      color: "white",
                      marginRight: "400px"
                    }}
                    variant="contained"
                    label="Cancel"
                    onClick={handClose}
                  />
                </Grid>
                <Grid container item xs={6} display="flex" justifyContent="flex-end" alignItems="flex-end">

                  <ButtonMui
                    sx={{
                      background: "black",
                      color: "white",
                    }}
                    type="submit"
                    variant="contained"
                    label="Add User"
                  />


                </Grid>

              </Grid>

            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
