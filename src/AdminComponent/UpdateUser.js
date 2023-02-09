/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const UpdateUser = () => {
  const [edit, setEdit] = useState(false);

  const handClose = () => setEdit(false);
  //const handShow = () => setEdit(true);
  return (
    <>
      <Modal
        show={edit}
        onHide={handClose}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        id="edit_modal"
        className="edit_modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="create_user_form">
            <label className="edit_id">ID</label>
            <br></br>
            <input
              type="text"
              className=""
              id="edit_id"
              required
              autoFocus
            />{" "}
            <br></br>
            <br></br>
            <label className="edit_name">User Name</label>
            <br></br>
            <input type="text" className="" id="edit_name" required /> <br></br>
            <br></br>
            <label className="edit_code">User Code</label>
            <br></br>
            <input type="text" className="" id="edit_code" required /> <br></br>
            <br></br>
            <label className="edit_password">Password</label>
            <br></br>
            <input type="text" className="" id="edit_password" required />{" "}
            <br></br>
            <br></br>
            <label className="edit_email">Email</label>
            <br></br>
            <input type="text" className="" id="edit_email" required />{" "}
            <br></br>
            <br></br>
            <label className="edit_mobile">Mobile</label>
            <br></br>
            <input type="text" className="" id="edit_mobile" required />{" "}
            <br></br>
            <br></br>
            <label className="edit_address">Address</label>
            <br></br>
            <input type="text" className="" id="edit_address" required />{" "}
            <br></br>
            <br></br>
            <label className="edit_role">Role</label>
            <br></br>
            <input type="text" id="edit_role" required /> <br></br>
            <br></br>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUser;
