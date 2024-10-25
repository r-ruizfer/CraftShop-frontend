import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/config.js";
import { AuthContext } from "../../context/auth.context.jsx";
import googleLogo from "../../assets/images/google-logo.png";

function Login() {
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Maneja los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Inicio de sesión con Google
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
  };

  // Inicio de sesión con email y password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post("/auth/login", formData);
      localStorage.setItem("authToken", response.data.authToken);
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "An error occurred";
      setErrorMessage(message);
      if (!error.response || error.response.status !== 400) navigate("*");
    }
  };

  // Cierra sesión
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
  };

  // Redirige al perfil si ya está logueado
  if (isLoggedIn) {
    return (
      <div id="not-login">
        <h1>You are Logged in Already!</h1>
        <p>
          Check your <Link to="/profile">profile</Link> or{" "}
          <Link onClick={handleLogout}>Log Out</Link>
        </p>
        <img
          src="https://giffiles.alphacoders.com/219/219202.gif"
          alt="what are you doing here?"
        />
      </div>
    );
  }

  return (
    <div className="login-body">
      <div className="login-container">
        <h1>Log In</h1>
        <p style={{ color: "gray" }}>
          Don't have an account? <Link to="/signup">Sign up here!</Link>
        </p>
        <div className="google-buttons">
          <button onClick={handleGoogleLogin}>
            <div className="google-buttons-content">
              <img src={googleLogo} alt="Google logo" />
              Login with Google
            </div>
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Log In</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
