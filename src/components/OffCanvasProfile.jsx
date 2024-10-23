import Offcanvas from "react-bootstrap/Offcanvas";
import { person } from "react-icons-kit/oct/person";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Spinner from 'react-bootstrap/Spinner';
import LogoutModal from "./LogoutModal";

import "../assets/styles/offcanvas.css"

function OffCanvasProfile(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  const { user, isLoggedIn, authenticateUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  

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
  const handleLogOutClick = () => {
    setShowModal(true); 
  };
  const handleConfirmLogOut = () => {
    setShowModal(false);
    props.handleLogout()
    console.log('Usuario cerró sesión');
  };
  const handleCloseModal = () => {
    setShowModal(false); 
  };
 if(loading === true && isLoggedIn){
  return  <Spinner animation="border" variant="primary" size="sm" />
 }
 


  return (
    <div>
      <Icon icon={person} size={15} onClick={handleShow} />
      <Offcanvas
        className="offcanvas-container"
       
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton className="offcanvas-header">
          <Offcanvas.Title>Profile Options</Offcanvas.Title>
          </Offcanvas.Header>
         <Offcanvas.Body className="offcanvas-body" >
           {isLoggedIn && user ? (
             <Link to="/profile/" className="offcanvas-link" onClick={handleClose}>
               <div>
                 <img
                   src={userProfile.image}
                   alt="profile-photo"
                   className="offcanvas-profile-photo"
                 />
                 <p className="offcanvas-username">{userProfile.username}</p>
               </div>
               <p>View Profile</p>
             </Link>
           ) : null}

           {!isLoggedIn && (
             <Link to="/signup" className="offcanvas-link" onClick={handleClose}>
               Sign Up
             </Link>
           )}
           {!isLoggedIn && (
             <Link to="/login" className="offcanvas-link" onClick={handleClose}>
               Log In
             </Link>
           )}

           {isLoggedIn && (
            <div>

              <Link onClick={handleLogOutClick} className="offcanvas-link offcanvas-logout">
                Log Out
              </Link>
              <LogoutModal
              show={showModal}
              onClose={handleCloseModal}
              onConfirm={handleConfirmLogOut}
            />
            </div>
           )}
         </Offcanvas.Body>
       </Offcanvas>
     </div>
   );
}

export default OffCanvasProfile;
