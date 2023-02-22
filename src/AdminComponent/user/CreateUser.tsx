
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../AdminNavbar";
import {Box, Button, Typography } from '@mui/material';
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DynamicPopup from "../../components/DynamicPopup";
import { UserPopup } from "./UserPopup";
import ConfirmDialog from "../../components/ConfirmDialog";
import useSnackbarHook from "../../components/useSnackbarHook";

interface InitialFieldValues {
  id: number,
  userCode: string,
  userName: string,
  password: string,
  email: string,
  mobile: string,
  address:string,
  role: string,
}

// initialFields
const initialFieldValues: InitialFieldValues = {
  id: 0,
  userCode: "",
  userName: "",
  password: "",
  email: "",
  mobile: "",
  address: "",
  role: "",
}


export const CreateUser = () => {
 // snackbar custom hook
 const{setMysnackbar}=useSnackbarHook();
 // --------------------------------------

  const [values, setValues] = useState(initialFieldValues);
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState('Add User');
 

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    onConfirm: () : void=>{} ,
  });


  /////////////delete user api call
  const deleteUser=(event:any, cellValues:any)=> {
    axios
      .get(`http://localhost:8081/user-details/delete/ ${cellValues.row.id}`)
      .then((res) => {
        console.log(res);
        if (res.data === "User record deleted") {
          setMysnackbar("User deleted successfully.","success");
          setTimeout(function () {
            window.location.href = "http://localhost:3000/createuser";
          }, 1000);
       
        }
      })
      .catch((err) => {
        setMysnackbar("Oops Unable to delete user","error");
      });
  }

  ///////////////////////////////////////////////

  const addUser = () => {
    setOpenPopup(true);
    setTitle('Add User');
  }

  const handShow = (event:any, cellValues:any) => {
    setValues(cellValues.row);
    setOpenPopup(true);
    setTitle("Edit User");
  };

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
      .catch((err) =>{
        setMysnackbar("Oops Unable to get user list","error");
      });
  }, []);



  //  columns
  const columns = [

    { field: 'userCode', headerName: 'User Code', width: 200 },
    { field: 'userName', headerName: 'User Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 180 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'role', headerName: 'Address', width: 180 },
    {
      field: 'actions',
      renderCell: (cellValues:any) => {
        return (
          <>
            <EditIcon sx={{ color: "green" }}
              onClick={(event) => {
                handShow(event, cellValues);
              }}
            />
              <DeleteIcon sx={{ color: "red" }}
              onClick={(event) => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to delete this record?',
                  subtitle: "Note :  You can't undo this operation",
                  onConfirm: () =>  {
                    deleteUser(event, cellValues);
                    setConfirmDialog({ ...confirmDialog, isOpen: false });
                  },
                });
              }
            }
            />
          </>
        )
      }, headerName: 'Actions', width: 100

    }
  ]

  const handleCellClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param:any, event:any) => {
    event.stopPropagation();
  };
  ///////////////////////////////////////////////////////////////////////////

  return (
    <>
      <AdminNavbar />

      <Typography sx={{
          textAlign: "center",
          marginTop: "30px",
          fontSize:"35px"
        }} ><b>User Details</b></Typography>

      <Box sx={{ marginLeft: "68px"}}>
        <Button variant="contained" sx={{ backgroundColor: "#22998d" }} onClick={addUser}>
          Add User
        </Button>
      </Box>

      <Box sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
        {loadData && (

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={user}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}

            />
          </div>
        )}

        {openPopup === true && (
          <DynamicPopup
            openPopup={openPopup}
            title={title}
            onClose={() => {

              setOpenPopup(false);
              setValues(initialFieldValues);

            }}
            maxWidth="md"
          >
            <UserPopup
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


      </Box>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};
