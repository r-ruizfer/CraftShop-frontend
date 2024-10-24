import { useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import service from "../../services/config";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlefirstNameChange = (e) => setFirstName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        username,
        password,
        firstName,
        lastName,
        image,
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
  const handleImageUpload = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "df3wnbw9q",
        uploadPreset: "ppvoj5fx",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Image succesfully uploaded: ", result.info.secure_url);
          setImage(result.info.secure_url);
        }
      }
    );
  };
  return (
    <div className="signup-container">
      <h1>Sign Up Here</h1>
      <p style={{ color: "gray" }}>
        Already have an account? <Link to={"/login"}>Log in here!</Link>{" "}
      </p>
      <button onClick={handleGoogleSignup}>signup with google</button>
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
        <label>Profile Picture: </label>{" "}
        <Button variant="primary" onClick={handleImageUpload}>
          Upload new Profile Picture
        </Button>
        {image && (
          <div className="mt-3">
            <img
              src={image}
              alt="Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
