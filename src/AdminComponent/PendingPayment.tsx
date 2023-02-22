import React, { useEffect, useState } from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import useSnackbarHook from "../components/useSnackbarHook";


export const PendingPayment = () => {

   // snackbar custom hook
   const{setMysnackbar}=useSnackbarHook();
   // --------------------------------------
  const [schemePendingPaymentList, setSchemePendingPaymentList] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/schemePaymentpendingList/schemePending")
      .then((res) => {
        console.log(res.data);
        setSchemePendingPaymentList(res.data);
        setLoadData(true);
      })
      .catch((err) => {
        setMysnackbar(`Oops Unable to get scheme pending payment list`,"error");
      });
  }, []);

  
  // table data
  const columns = [

    { field: 'schemeName', headerName: 'Scheme Name', width: 250 },
    { field: 'startDate', headerName: 'Start Date', width: 250 },
    { field: 'endDate', headerName: 'End Date', width: 250 },
    { field: 'numberOfUser', headerName: 'Number Of User', width: 250 },
    {
      field: 'pendingPaymentCount',
      renderCell: (cellValues:any) => {
        return (

          <Link style={{ color: "blue" }} to={`/userspendingpayment/${cellValues.row.id}/${cellValues.row.schemeName}`}>{cellValues.row.pendingPaymentCount}</Link>
        )
      }
      , headerName: 'Pending Payment Count', width: 230
    }
     ]

  const handleCellClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param:any, event:any) => {
    event.stopPropagation();
  };


  return (
    <>
      <AdminNavbar />

      <div>
        <div>
        <Typography sx={{
          textAlign: "center",
          marginTop: "30px",
          fontSize:"35px"
        }} ><b>PENDING PAYMENT</b></Typography>
          <Box  sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
            {loadData && (
             
              <div style={{ height: 400, width: '100%' }}>
              <DataGrid
              rows={schemePendingPaymentList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}
            />
            </div>

            )}
          </Box>
        </div>
      </div>
    </>
  );
};
