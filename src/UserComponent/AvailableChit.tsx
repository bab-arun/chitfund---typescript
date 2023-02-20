import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';

export const AvailableChit = () => {
  const [scheme, setScheme] = useState([]);
  const [val, setVal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get("http://localhost:8081/scheme-details/showAll")
      .then((res) => {
        console.log(res.data);
        setScheme(res.data);
        setVal(true);
      })
      .catch((err) => {
        enqueueSnackbar('Oops unable to get available chit', { variant: "success", autoHideDuration: 4000 });
      });
  }, []);

 
  
  // table data
  const columns = [
    { field: 'schemeName', headerName: 'Scheme Name', width: 270 },
    { field: 'schemeAmount', headerName: 'Scheme Amount', width: 150 },
    { field: 'numberOfUser', headerName: 'Number Of User ', width:150 },
    { field: 'payAmount', headerName: 'Installment Amount', width: 150 },
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

  return (
    <>
      <UserNavbar />

      <div>
      <Typography sx={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "35px"
          }} ><b> AVAILABLE CHIT SCHEMES</b></Typography>

        <Box  sx={{
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
