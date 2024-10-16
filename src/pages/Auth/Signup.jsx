import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlefirstNameChange = (e) => setFirstName(e.target.value);
  const handleProfilePictureChange = (e) => setProfilePicture(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        username,
        password,
        firstName,
        lastName,
        profilePicture,
        address,
      };
      await service.post("/auth/signup", newUser);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error ocurred. Please try again later");
        navigate("*");
      }
    }
  };
  return (
    <div className="signup-container">
      <h1>Sign Up Here</h1>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter you email (required)"
          required
        />
        <br />
        <label> Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username (required)"
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your Password (required)"
          required
        />
        <label>First name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handlefirstNameChange}
          placeholder="Enter your first name (optional)"
        />
        <br />
        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Enter your last name (optional)"
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="Address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter your Address (optional)"
        />
        <label>Profile Picture:</label>
        <input
          type="url"
          name="ProfilePicture"
          value={profilePicture}
          onChange={handleProfilePictureChange}
          placeholder="upload a PFP"
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
