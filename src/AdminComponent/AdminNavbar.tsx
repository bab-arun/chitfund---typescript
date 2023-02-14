import React from "react";
import { useNavigate,Link } from "react-router-dom";
import {AppBar,Toolbar,Button, Typography, Box,Stack } from '@mui/material';

export const AdminNavbar = () => {
  const logout = useNavigate();

  let userCode = sessionStorage.getItem("userCode");
  console.log(userCode);

  return (
    <>
      <div>
        
        <AppBar position="static" sx={{backgroundColor:"black"}}>
          <Toolbar>
         
            <Link
              to="/adminhomepage"
              style={{ color: "white", textDecoration: "none" }}
            >
              HOME
            </Link>
              <Link
                to="/createuser"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Create User
              </Link>

              <Link
                to="/adminentry"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Admin Entry
              </Link>
              <Link
                to="/acceptpayment"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Accept Payment
              </Link>
              <Link
                to="/pendingpayment"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Pending Payment
              </Link>
              <Link
                to="/showprogress"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Show Progress
              </Link>
           <Box sx={{marginLeft:"430px"}}>
           <Stack direction="column">
            <Button variant="contained"  sx={{backgroundColor:"grey",height:"30px"}} onClick={() => logout("/")}>
              Logout
            </Button>
            <Typography sx={{color:"#22998d"}}>{userCode}</Typography>
            </Stack>
            </Box>
         
        </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
