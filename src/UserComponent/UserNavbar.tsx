import React from "react";
import { useNavigate,Link } from "react-router-dom";
import {AppBar,Toolbar,Button, Typography, Box,Stack } from '@mui/material';

import "../CssComponent/component.css";

export const UserNavbar = () => {
  const logout = useNavigate();

  let userCode = sessionStorage.getItem("userCode");

  return (
    <AppBar position="static" sx={{backgroundColor:"black"}}>
          <Toolbar>
        <Link
          to="/userhomepage"
          style={{ color: "white", textDecoration: "none" }}
        >
          HOME
        </Link>
       
          <Link
            to="/updatepayment"
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "30px",
            }}
          >
            Make Payment
          </Link>
          <Link
            to="/paymenthistory"
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "30px",
            }}
          >
            Payment History
          </Link>

          <Link
            to="/availablechitschemes"
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "30px",
            }}
          >
            Available ChitSchemes
          </Link>
          <Box sx={{marginLeft:"650px"}}>
           <Stack direction="column">
            <Button variant="contained"  sx={{backgroundColor:"grey",height:"30px"}} onClick={() => logout("/")}>
              Logout
            </Button>
            <Typography sx={{color:"#22998d"}}>{userCode}</Typography>
            </Stack>
            </Box>
        </Toolbar>
        </AppBar>
  );
};
