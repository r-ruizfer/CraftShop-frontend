import Offcanvas from "react-bootstrap/Offcanvas";
import { person } from "react-icons-kit/oct/person";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";
import { BackgroundColor } from "@cloudinary/url-gen/actions/background/actions/BackgroundColor";

function OffCanvasProfile(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, isLoggedIn, authenticateUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (user._id) {
          service
            .get(`/users/${user._id}`)
            .then((response) => {
              console.log(response);
              setUserProfile(response.data);
              setLoading(false);
            })
            .catch((err) => {
              const errorDescription = err.response.data.message;
              setErrorMessage(errorDescription);
            });
        } else {
          setErrorMessage("User ID is not available.");
          setLoading(false);
        }
      }
    };
    getUser();
  }, [isLoggedIn, user]);

  return (
    <div>
      <Icon icon={person} size={15} onClick={handleShow} />
      <Offcanvas
        style={{ width: "200px" }}
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body onClick={handleClose}>
          {isLoggedIn && user ? (
            <Link
              to="/profile/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={userProfile.image}
                alt="profile-photo"
                className="offcanvas-profile-photo"
              />
              <p>{userProfile.username}</p>
              View Profile
            </Link>
          ) : null}

          {!isLoggedIn && (
            <Link
              to="/signup"
              style={{
                listStyle: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <li> Sign Up</li>
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              style={{
                listStyle: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <li>Log In</li>
            </Link>
          )}

          {isLoggedIn && (
            <Link
              onClick={props.handleLogout}
              style={{
                listStyle: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <li>Log Out</li>
            </Link>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default OffCanvasProfile;
