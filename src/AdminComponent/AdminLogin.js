/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "../CssComponent/component.css";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const adminhomepage = useNavigate();

  return (
    <div className="userform">
      <form onSubmit={() => adminhomepage("adminhomepage")}>
        <h1 className="userlogin_header">WELCOME TO CHIT SCHEME</h1>

        <div className="usercredential">
          <label>AdminCode</label>
          <br></br>
          <input
            type="text"
            className="UserLogin_textbox"
            required
            autoFocus
          />{" "}
          <br></br>
          <br></br>
          <label>Password</label> <br></br>
          <input type="password" className="UserLogin_textbox" required />
          <br></br>
          <input type="submit" className="Login_submit" />
        </div>
      </form>
    </div>
  );
};
