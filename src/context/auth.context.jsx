import { createContext, useState, useEffect } from "react";
import service from "../services/config";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const response = await service.get(`/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const user = response.data;

        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
        console.log("Usuario autenticado:", user);
      } catch (error) {
        console.error("Error al verificar el token:", error);
        setAuthError(error.response?.data?.message || "Token invalid");
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthWrapper, AuthContext };
