import service from "../../services/config.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";
import { Link } from "react-router-dom";
import googleLogo from "../../assets/images/google-logo.png";

function Login() {
  const navigate = useNavigate();
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleGoogleLogin = async () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/auth/google/login`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await service.post("/auth/login", userCredentials);

      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        navigate("*");
      }
    }
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
      <div className="login-body">
        <div className="login-container">
          <h1>Log In</h1>
          <p style={{ color: "gray" }}>
            Don't have an account? <Link to={"/signup"}>Sign up here!</Link>{" "}
          </p>
          <div className="google-buttons">
            <button onClick={handleGoogleLogin}>
              <div className="google-buttons-content">
                <img src={googleLogo} alt="google logo" />
                Login with Google
              </div>
            </button>
          </div>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />

            <br />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />

            <br />

            <button type="submit">Log In</button>

            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
