import SearchBar from "../components/SearchBar";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser, isAdmin } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav id="navbar">
        <Link to={"/"}>
          <li>Logo</li>
        </Link>
        <li>
          <SearchBar />
        </li>
        <Link to={"/wishlist"}>
          <li>Favs</li>
        </Link>
        <Link to={"/cart"}>
          <li>Cartbutton</li>
        </Link>
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
        {isLoggedIn && (
          <Link onClick={handleLogout}>
            <li>Log Out</li>
          </Link>
        )}
        <Link to="/profile/">
          <li>profilebutton</li>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
