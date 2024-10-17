import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const getUser = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        service
          .get(`/users/${user._id}`)
          .then((response) => {
            setUserProfile(response.data);
            setLoading(false);
            console.log(response.data)
          })
          .catch((err) => {
            const errorDescription = err.response.data.message;
            setErrorMessage(errorDescription);
          });
      } else {
        setErrorMessage("User not logged in");
      }
    };
    getUser();
  }, [user._id]);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (loading) return <div>Loading</div>;
if(!userProfile){
  return <h1>User not found</h1>
}
  return (
    <div className="StudentDetailsPage bg-gray-100 py-6 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {userProfile && (
          <>
            {/* <img className="w-32 h-32 rounded-full object-cover mb-4" src={student.image} alt="profile-photo" /> */}
            <img
              src={userProfile.image}
              alt="profile-photo"
              className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
            />
            <h1 className="text-2xl mt-4 font-bold absolute">
              {userProfile.username}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Email:</strong> {userProfile.email}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
