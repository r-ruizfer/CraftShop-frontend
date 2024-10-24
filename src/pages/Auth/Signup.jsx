import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context.jsx";
import { Button } from "react-bootstrap";
import googleLogo from "../../assets/images/google-logo.png";
function Signup() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  // Estado para todos los campos
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    image: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Maneja los cambios en todos los campos de entrada
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos del nuevo usuario
      await service.post("/auth/signup", formData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
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
          console.log("Image successfully uploaded: ", result.info.secure_url);
          setFormData({ ...formData, image: result.info.secure_url });
        }
      }
    );
  };
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoggedIn) {
    return (
      <div id="not-login">
        <h1>You are Logged in Already!</h1>
        <p>
          check your <Link to={"/profile"}>profile</Link> or{" "}
          <Link onClick={handleLogout}>Log Out</Link>
        </p>
        <img
          src="https://giffiles.alphacoders.com/219/219202.gif"
          alt="what are you doing here?"
        />
      </div>
    );
  } else {
    return (
      <div className="signup-container">
        <h1>Sign Up Here</h1>
        <p style={{ color: "gray" }}>
          Already have an account? <Link to={"/login"}>Log in here!</Link>
        </p>
        <div className="google-buttons">
          <button onClick={handleGoogleSignup}>
            <div className="google-buttons-content">
              <img src={googleLogo} alt="google logo" />
              Sign up with Google
            </div>
          </button>
        </div>
        <form onSubmit={handleSignup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email (required)"
            required
          />
          <br />
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username (required)"
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password (required)"
            required
          />
          <br />
          <label>First name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name (optional)"
          />
          <br />
          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name (optional)"
          />
          <br />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address (optional)"
          />
          <br />
          <label>Profile Picture:</label>
          <Button variant="primary" onClick={handleImageUpload}>
            Upload new Profile Picture
          </Button>
          {formData.image && (
            <div className="mt-3">
              <img
                src={formData.image}
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    );
  }
}

export default Signup;
