import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import { Button } from "react-bootstrap";

function Profile() {
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
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (confirmDelete) {
        const storedToken = localStorage.getItem("authToken");

        if (storedToken && isLoggedIn && user) {
          await service.delete(`/users/${userProfile._id}/`);
          handleLogout();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!userProfile) {
    return (
      <>
        <h1>You are not logged in!</h1>
        {!isLoggedIn && (
          <Link to="/signup">
            {" "}
            <li>Sign Up</li>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <li>Log In</li>
          </Link>
        )}
      </>
    );
  }
  if (loading) return <div>Loading</div>;
  console.log(userProfile._id);
  if (!userProfile) {
    return (
      <>
        <h1>You are not logged in!</h1>
        {!isLoggedIn && (
          <Link to="/signup">
            {" "}
            <li>Sign Up</li>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <li>Log In</li>
          </Link>
        )}
      </>
    );
  }
  if (userProfile && isLoggedIn) {
    return (
      <div className="profile-container">
        {userProfile && (
          <div className="profile-content">
            <img
              src={userProfile.image}
              alt="profile-photo"
              className="profile-photo"
            />
            <h1>{userProfile.username}</h1>

            <div>
              <strong>Email: </strong> {userProfile.email}
              <br />
              <strong>Name: </strong> {userProfile.firstName}
              <br />
              <strong>Surname: </strong> {userProfile.lastName}
              <br />
              <strong>Address: </strong> {userProfile.address}
            </div>
            {userProfile.isAdmin === true ? (
              <div className="admin-controls">
                <p>Admin controls:</p>
                <AddProductForm type="add" />
              </div>
            ) : null}
            <div className="profile-buttons">
              <Button className="delete-button" variant="outline-danger" onClick={handleDelete}>
                Delete account
              </Button>
              <AddProductForm
                type="edit user"
                username={userProfile.username}
                email={userProfile.email}
                firstName={userProfile.firstName}
                lastName={userProfile.lastName}
                address={userProfile.address}
                image={userProfile.image}
                id={userProfile._id}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
