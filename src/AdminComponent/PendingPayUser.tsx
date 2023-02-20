/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';

export const PendingPayUser = () => {
  const { schemeName, userCode } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [monthlyUserPendingPaymentList, setmonthlyUserPendingPaymentList] =
    useState([]);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/userMonthlyPending/userPendingPayment", {
        params: {
          userCode: userCode,
          schemeName: schemeName,
        },
      })
      .then((res) => {
        setmonthlyUserPendingPaymentList(res.data);
        setLoadData(true);
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get user monthly pending payment list`, { variant: "error", autoHideDuration: 4000 });
      });
  }, []);

  // table data
  const columns = [

    { field: 'installmentDate', headerName: 'Installment Date', width: 400 },
    { field: 'status', headerName: 'Status', width: 400 },
    { field: 'paidDate', headerName: 'Paid Date', width: 412 },
  ]

  const handleCellClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  ////////////////////////////////////////
  return (
    <>
      <AdminNavbar />

      <div>
        <div>
         
          <Typography sx={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "35px"
          }} ><b> PENDING PAYMENTS SCHEME AND USER INFORMATION</b></Typography>

          <Typography style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            <b>SCHEME NAME - {schemeName}</b>
          </Typography>

          <Typography style={{ textAlign: "center", marginTop: "20px", color: "blue" }}>
            <b> USER ID - {userCode}</b>
          </Typography>

           <Box  sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
            {loadData && (
               <div style={{ height: 400, width: '100%' }}>
               <DataGrid
                 rows={monthlyUserPendingPaymentList}
                 columns={columns}
                 pageSize={5}
                 rowsPerPageOptions={[5]}
                 onCellClick={handleCellClick}
                 onRowClick={handleRowClick}
                 getRowId={(row:any) => row.status }
               />
             </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};
