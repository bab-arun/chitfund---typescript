import React from "react";
import { UserNavbar } from "./UserNavbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { AnyObject } from "yup/lib/types";
import { useSnackbar } from 'notistack';


export const UserHomepage = () => {
  const [val, setVal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // get api for user table

  const [scheme, setScheme] = useState([]);

  let usercode = sessionStorage.getItem("userCode");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getschemedetails/user", {
        params: {
          userCode: usercode,
        },
      })
      .then((res) => {
        console.log(res.data);
        setScheme(res.data);
        setVal(true);
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get user schemes`, { variant: "error", autoHideDuration: 4000 });
      });
  }, [usercode]);


  // data grid
  const columns = [

    { field: 'schemeName', headerName: 'Scheme Name', width: 160 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 130 },
    { field: 'numberOfUser', headerName: 'Number Of Users', width: 130 },
    { field: 'payAmount', headerName: 'Installment Amount', width: 130 },
    { field: 'schemeDuration', headerName: 'Scheme Duration', width: 100 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    {
      field: 'makePayment',
      renderCell: (cellValues:AnyObject) => {
        return (
          <Link style={{ color: "blue" }} to={`/updatepayment/${cellValues.row.schemeName}`}>MAKE PAYMENT</Link>
        )
      }
      , headerName: 'Make Payment', width: 130
    },
    {
      field: 'paymentHistory',
      renderCell: (cellValues:any) => {
        return (
          <Link style={{ color: "blue" }} to={`/paymenthistory/${cellValues.row.schemeName}`}>PAYMENT HISTORY</Link>
        )
      }
      , headerName: 'Payment History', width: 190
    },

  ]

  const handleCellClick = (param: any, event: any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param: any, event: any) => {
    event.stopPropagation();
  };


  return (
    <>
      <UserNavbar />

      <div>
        <Typography sx={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "35px"
        }} ><b> User Chit Schemes</b></Typography>
        <Box sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
          {val && (

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={scheme}
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
      
    </>
  );
};
