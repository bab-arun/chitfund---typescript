/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { ChitSchemeContext } from "../../App";
import { AdminNavbar } from "../AdminNavbar";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import DynamicPopup from "../../components/DynamicPopup";
import { SchemePopup } from "./SchemePopup";

interface InitialFieldValues {
  id: number,
  schemeName: string,
  schemeAmount: number,
  numberOfUser: number,
  payAmount: number,
  schemeDuration: number,
  startDate: any,
  endDate: any
}
// initialFields
const initialFieldValues: InitialFieldValues = {
  id: 0,
  schemeName: "",
  schemeAmount: 0,
  numberOfUser: 0,
  payAmount: 0,
  schemeDuration: 0,
  startDate: null,
  endDate: null,
}


export const AdminHomepage = () => {
  const { setLinkSchemeName } = useContext(ChitSchemeContext);
  const [values, setValues] = useState(initialFieldValues);
  const [schemeDuration, setSchemeDuration] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [title, setTitle] = useState('Add Scheme');

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    onConfirm: '',
  });



  const handShow = (event: any, cellValues: any) => {
    setValues(cellValues.row);
    setOpenPopup(true);
    setTitle("Edit Scheme");
  };

  const assignLinkPopulate = (x: any) => {
    console.log(x.row.schemeName);
    setLinkSchemeName(x.row.schemeName);
    if (x.row.numberOfUser === x.row.schemeUserCount) {
      swal("User Count is Full", "You are unable to add user", "warning");
    } else {
      navigate("/assignscheme");
    }
  };

  const editSchemeApi = (e: any) => {
    e.preventDefault();
    let id = e.target[0].value;
    let schemeName = e.target[1].value;
    let schemeAmount = e.target[2].value;
    let numberOfUser = e.target[3].value;
    let payAmount = e.target[4].value;
    let schemeDuration = e.target[5].value;
    let startDate = e.target[6].value;
    let endDate = e.target[7].value;

    console.log({
      id,
      schemeName,
      schemeAmount,
      numberOfUser,
      payAmount,

      schemeDuration,
      startDate,
      endDate,
    });

    axios
      .post("http://localhost:8081/addSchemeDetails/save", {
        id,
        schemeName,
        schemeAmount,
        numberOfUser,
        payAmount,

        schemeDuration,
        startDate,
        endDate,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Scheme inserted successfully") {
          swal({
            title: "Edit Scheme Saved Successfully!!!",
          }).then(function () {
            window.location.href = "http://localhost:3000/adminhomepage";

          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////////////////////////////////

  // Delete Api for scheme table///////////////////////////////////

  const deleteScheme = (event: any, cellValues: any) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, Assigned users are deleted with Scheme",
      icon: "warning",
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .get(`http://localhost:8081/scheme-details/delete/ ${cellValues.row.id}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        window.location.href = "http://localhost:3000/adminhomepage";
      }
    });
  };

  // get api for user table

  const [scheme, setScheme] = useState([]);
  const [val, setVal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/scheme-details/showAll")
      .then((res) => {
        console.log(res.data, "scheme");
        setScheme(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, []);




  ///////////////////date

  const durationHandler = (e: any) => {
    setSchemeDuration(e.target.value);
    setStartDate("");
  };

  const startDateHandler = (e: any) => {
    let date: any = new Date(e.target.value);
    setStartDate(e.target.value);

    let duration: any = schemeDuration;
    let monthValue = 12;

    let year = Math.floor(duration / monthValue);
    let month = duration % monthValue;

    if (year > 0) {
      let newYear = date.getFullYear() + year;
      date.setFullYear(newYear);
    }
    if (month > 0) {
      let newMonth = date.getMonth() + month;
      date.setMonth(newMonth);
    }

    date = new Date(date).toISOString().slice(0, 10); //change format yyyy-MM-dd

    setEndDate(date);
  };
  // action for dataTable
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };


  // data grid
  const columns = [

    { field: 'schemeName', headerName: 'Scheme Name', width: 130 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 130 },
    { field: 'numberOfUser', headerName: 'Number Of Users', width: 130 },
    {
      field: 'schemeUserCount',
      renderCell: (cellValues: any) => {
        return (

          <p>
            <a
              // href
              title="Assign scheme page"
              onClick={() => assignLinkPopulate(cellValues)}
              style={{ textDecoration: "underline" }}
            >
              <b>{cellValues.row.schemeUserCount}</b>
            </a>
          </p>
        )
      },
      headerName: 'User Count', width: 130
    },
    { field: 'payAmount', headerName: 'Installment Amount', width: 130 },
    { field: 'schemeDuration', headerName: 'Scheme Duration', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    {
      field: 'AdminEntry',
      renderCell: (cellValues: any) => {
        return (
          <Link style={{ color: "blue" }} to={`/adminentry/${cellValues.row.schemeName}/${cellValues.row.payAmount}`}>Admin Entry</Link>
        )
      }
      , headerName: 'Admin Entry', width: 130
    },
    {
      field: 'actions',
      renderCell: (cellValues: any) => {
        return (
          <>
            <EditIcon sx={{ color: "green" }}
              onClick={(event) => {
                handShow(event, cellValues);
              }}
            />
            <DeleteIcon sx={{ color: "red" }}
              onClick={(event) => {
                deleteScheme(event, cellValues);
              }}
            />
          </>
        )

      }
      , headerName: 'Actions', width: 130
    },
  ]

  const handleCellClick = (param: any, event: any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param: any, event: any) => {
    event.stopPropagation();
  };

  const addScheme = () => {
    setOpenPopup(true);
    setTitle('Add Scheme');
  }

  return (
    <>
      <AdminNavbar />
      <div>
        <h1 className="create_user_header">CHIT SCHEMES</h1>
        <div className="admin_create_scheme_button">
          {/* <Button variant="success" onClick={() => navigate("/createscheme")}>
            Add Scheme
          </Button> */}
          <Button variant="contained" sx={{ backgroundColor: "#22998d" }} onClick={addScheme}>
            Add Scheme
          </Button>
        </div>

        <div className="chit_scheme_home">
          {val && (

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={scheme}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
              />
            </div>

          )}


          {/* *********************** edit scheme *********************************
          <Modal
            show={edit}
            onHide={handClose}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Scheme</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form
                onSubmit={(e) => {
                  editSchemeApi(e);
                }}
                className="create_user_form"
              >
                <input
                  type="hidden"
                  className=""
                  value={selectedData.id}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_scheme_name">Scheme Name</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.schemeName}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_scheme_amount">Scheme Amount</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.schemeAmount}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_number_of_user">Number Of Users</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.numberOfUser}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_installment_amount">
                  Installment Amount
                </label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.payAmount}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_scheme_duration">Scheme Duration</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={schemeDuration}
                  onChange={durationHandler}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_start_date">Start Date</label>
                <br></br>
                <input
                  type="date"
                  id="previousDateHider"
                  className="input_start_date"
                  value={startDate}
                  onChange={startDateHandler}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_end_date">End Date</label>
                <br></br>
                <input
                  type="date"
                  className="input_end_date"
                  value={endDate}
                  readOnly
                  required
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

          {openPopup === true && (
            <DynamicPopup
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              title={title}
              onClose={() => {

                setOpenPopup(false);
                setValues(initialFieldValues);

              }}
              maxWidth="md"
            >
              <SchemePopup
                setOpenPopup={setOpenPopup}
                values={values}
                setValues={setValues}
                initialFieldValues={initialFieldValues}
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                setTitle={setTitle}
              />
            </DynamicPopup>
          )}

          {/* /////////////////////////////////////////////////////////////////////// */}
        </div>
      </div>
    </>
  );
};
