import React, { useState, useEffect } from "react";
import { UserNavbar } from "./UserNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';

export const PaymentHistory = () => {
  let usercode = sessionStorage.getItem("userCode");
  const { schemeName } = useParams();
  const [paymentHistoryList, setPaymentHistoryList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [val, setVal] = useState(false);
  useEffect(() => {
    let scheme = schemeName;
    if (scheme === undefined) {
      scheme = "";
    }

    axios
      .get(
        "http://localhost:8081/getUserPaymentHistoryList/paymentHistoryList",
        {
          params: {
            userCode: usercode,
            schemeName: scheme,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPaymentHistoryList(res.data);
        setVal(true);
      })
      .catch((err) =>{
        enqueueSnackbar(`Oops Unable to get payment history`, { variant: "error", autoHideDuration: 4000 });
      });
  }, [schemeName, usercode]);


  // table data
  const columns = [
    { field: 'userId', headerName: 'User Code', width: 268 },
    { field: 'schemeId', headerName: 'Scheme Name', width: 250 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 150 },
    { field: 'installmentAmount', headerName: 'Paid Amount ', width: 200 },
    { field: 'instalDate', headerName: 'Installment Date', width: 180 },
    { field: 'paidAmountDate', headerName: 'Paid Date', width: 180 },
  ]

  const handleCellClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param:any, event:any) => {
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
          }} ><b> PAYMENT HISTORY</b></Typography>
        <Box sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
          {val && (
         
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={paymentHistoryList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}
              getRowId={(row:any) => row.schemeId }
            />
          </div>
          )}
        </Box>
      </div>
    </>
  );
};
