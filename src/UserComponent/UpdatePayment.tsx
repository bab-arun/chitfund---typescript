import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserNavbar } from "./UserNavbar";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import useSnackbarHook from "../components/useSnackbarHook";


export const UpdatePayment = () => {
   // snackbar custom hook
   const{setMysnackbar}=useSnackbarHook();
   // --------------------------------------
  let usercode = sessionStorage.getItem("userCode");
  const { schemeName } = useParams();
  const [installmentList, setInstallmentList] = useState([]);

  const [val, setVal] = useState(false);
  useEffect(() => {
    let scheme = schemeName;
    if (scheme === undefined) {
      scheme = "";
    }

    axios
      .get("http://localhost:8081/getUserPaymentList/duePaymentList", {
        params: {
          userCode: usercode,
          schemeName: scheme,
        },
      })
      .then((res) => {
       
        setInstallmentList(res.data);
        setVal(true);
      })
      .catch((err) => {
        setMysnackbar(`Oops Unable to get installment payment list`,"error");
      });
  }, [usercode, schemeName]);

  //////////////////////////////iterate table////////


  ///////////////////make payment by user

  const userPayment = (id:number) => {
    let paymentId = id;
   
    axios
      .get("http://localhost:8081/userPayment/payment", {
        params: {
          paymentId: paymentId,
        },
      })
      .then((res) => {
     
        if (res.data === "User Payment is Done") {
          setMysnackbar(`Payment Done Successfully`,"success");
          setTimeout(function () {
            window.location.href = "http://localhost:3000/updatepayment";
          }, 1000);
        }
      })
      .catch((err) => {
        setMysnackbar(`Oops Unable to proceed payment`,"error");
      });
  };

  ///////////////////////////////////////////////////

  // data grid
  const columns = [
    { field: 'userId', headerName: 'User Code', width: 250 },
    { field: 'schemeId', headerName: 'Scheme Name', width: 200 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 130 },

    { field: 'installmentAmount', headerName: 'Due Amount', width: 130 },
    { field: 'nextInstallmentDate', headerName: 'Due Date', width: 200 },
    { field: 'paymentType', headerName: 'Payment By', width: 130 },
    {
      field: 'makePayment',
      renderCell: (cellValues:any) => {
        return (
          <Button variant="contained" onClick={() => userPayment(cellValues.row.id)}>Make Payment</Button>
        )
      }
      , headerName: 'Make Payment', width: 190
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
        }} ><b>MAKE PAYMENT</b></Typography>

        <Box sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
          {val && (

            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={installmentList}
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
