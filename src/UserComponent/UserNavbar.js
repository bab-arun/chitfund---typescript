import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import "../CssComponent/component.css";

import { useNavigate, Link } from "react-router-dom";

export const UserNavbar = () => {
  const logout = useNavigate();

  let userCode = sessionStorage.getItem("userCode");

  ///
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link
          to="/userhomepage"
          style={{ color: "white", textDecoration: "none" }}
        >
          HOME
        </Link>
        <Nav className="me-auto">
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
        </Nav>

        <button className="admin_logout" onClick={() => logout("/")}>
          Logout
        </button>
        <div className="UserName">{userCode}</div>
      </Container>
    </Navbar>
  );
};
