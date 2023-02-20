import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';

export const AcceptPayment = () => {
  const { enqueueSnackbar } = useSnackbar();

  /////////////////accept payment list////////

  const [acceptPaymentList, setAcceptPaymentList] = useState([]);
  const [val, setVal] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/acceptPaymentList/userList")
      .then((res) => {
        console.log(res.data);
        setAcceptPaymentList(res.data);
        setVal(true);
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get payment list`, { variant: "error", autoHideDuration: 4000 });
      });
  }, []);

  
  ///////////////////////////////accept payment

  const acceptPayment = (id:number) => {
    let acceptPaymentId = id;
    console.log(acceptPaymentId);
    axios
      .get("http://localhost:8081/acceptPayment/admin", {
        params: {
          paymentId: acceptPaymentId,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Payment is Accepted") {
          
          enqueueSnackbar(`Payment Accepted Successfully`, { variant: "success", autoHideDuration: 4000 });
          setTimeout(function () {
            window.location.href = "http://localhost:3000/acceptpayment";
          }, 1000);
        }
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to proceed payment accept`, { variant: "error", autoHideDuration: 4000 });
      });
  };

  ///////////////////////////////////////////////////////////////
  const columns = [

    { field: 'userName', headerName: 'User Name', width: 160 },
    { field: 'userId', headerName: 'User Code', width: 200 },
    { field: 'schemeId', headerName: 'Scheme Name', width: 200 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 180 },
    { field: 'installmentAmount', headerName: 'Installment Amount', width: 140 },
    { field: 'paidAmountDate', headerName: 'Paid Date', width: 170 },
    {
      field: 'actions',
      renderCell: (cellValues:any) => {
        return (
          <Button variant="contained" onClick={() => acceptPayment(cellValues.row.id)}> Accept Payment</Button>
        )

      }
      , headerName: 'Actions', width: 200
    },
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
        <Typography sx={{
          textAlign: "center",
          marginTop: "30px",
          fontSize:"35px"
        }}><b>ACCEPT PAYMENT</b></Typography>
        <Box sx={{
          marginTop: "45px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
          {val && (

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={acceptPaymentList}
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
