import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { person } from "react-icons-kit/oct/person";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";

function OffCanvasProfile(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Icon icon={person} size={15} onClick={handleShow} />
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title onClick={handleClose}>
            <Link to="/profile/">View Profile</Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body onClick={handleClose}>
          <li>{!props.isLoggedIn && <Link to="/signup"> Sign Up</Link>}</li>
          <li>{!props.isLoggedIn && <Link to="/login">Log In</Link>}</li>
          <li>
            {props.isLoggedIn && (
              <Link onClick={props.handleLogout}>Log Out</Link>
            )}
          </li>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default OffCanvasProfile;
