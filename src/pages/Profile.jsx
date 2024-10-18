import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (user._id) {
          service
            .get(`/users/${user._id}`)
            .then((response) => {
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
 /* const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };*/

  const handleDelete= async ()=>{
    try {
      service.delete(`/users/${userProfile._id}`)
      navigate("/signup")
    } catch (error) {
      console.log(error)
    }
  }

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
          </div>
          <button>Delete account</button>

          {userProfile.isAdmin === true ? (
            <div className="admin-controls">
              <p>Admin controls:</p>
              <AddProductForm type="add" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Profile;
