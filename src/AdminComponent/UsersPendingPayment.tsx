/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';

export const UsersPendingPayment = () => {
  const { schemeId, schemeName } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [schemeUserPendingPaymentList, setSchemeUserPendingPaymentList] =
    useState([]);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/schemeUserPendingPayment/schemeUser", {
        params: {
          schemeId: schemeId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSchemeUserPendingPaymentList(res.data);
        setLoadData(true);
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get user pending payment list`, { variant: "error", autoHideDuration: 4000 });
      });
  }, []);

  /////////////////////////////////////////


  // table data
  const columns = [

    { field: 'userCode', headerName: 'User', width: 600 },
    {
      field: 'pendingPaymentCount',
      renderCell: (cellValues:any) => {
        return (
          <Link
            to={`/pendingpayuser/${schemeName}/${cellValues.row.userCode}`}
            style={{ color: "blue" }}
          >
            {cellValues.row.pendingPaymentCount}
          </Link>
        )
      }
      , headerName: 'Pending Payment Count', width: 628
    }
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
          }} ><b>PENDING PAYMENTS SCHEME INFORMATION</b></Typography>

          <Typography style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            <b>SCHEME NAME - {schemeName}</b>
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
                  rows={schemeUserPendingPaymentList}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  getRowId={(row :any) => row.userId }
                />
              </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};
