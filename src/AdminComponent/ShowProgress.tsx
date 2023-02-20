import React, { useEffect, useState } from "react";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';

export const ShowProgress = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [schemeTotalProgressList, setSchemeTotalProgressList] = useState([]);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getSchemeDetails/totalProgress")
      .then((res) => {
        // console.log(res.data);
        setSchemeTotalProgressList(res.data);
        setLoadData(true);
      })
      .catch((err) => {
        enqueueSnackbar(`Oops Unable to get chitschemes total progress`, { variant: "error", autoHideDuration: 4000 });
      });
  }, []);

  
  // table data
  const columns = [

    { field: 'schemeName', headerName: 'Scheme Name', width: 200 },
    { field: 'numberOfUser', headerName: 'Number Of User ', width:100 },
    { field: 'payAmount', headerName: 'Installment Amount', width: 100 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 150 },
    { field: 'collectedSchemeAmount', headerName: 'Collected Amount ', width: 200 },
    { field: 'schemeDuration', headerName: 'schemeDuration (in months) ', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 180 },
    { field: 'endDate', headerName: 'End Date', width: 180 },
  ]

  const handleCellClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  const handleRowClick = (param:any, event:any) => {
    event.stopPropagation();
  };

  ///////////////////////

  return (
    <>
      <AdminNavbar />

      <div>
      <Typography sx={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "35px"
          }} ><b> CHIT SCHEMES REPORT</b></Typography>
        <Box  sx={{
          marginTop: "8px",
          textAlign: "center",
          width: " 90%",
          marginLeft: "68px"
        }}>
          {loadData && (
             <div style={{ height: 400, width: '100%' }}>
             <DataGrid
               rows={schemeTotalProgressList}
               columns={columns}
               pageSize={5}
               rowsPerPageOptions={[5]}
               onCellClick={handleCellClick}
               onRowClick={handleRowClick}
               getRowId={(row : any) => row.schemeName }
             />
           </div>
          )}
        </Box>
      </div>
    </>
  );
};
