import SearchBar from "../components/SearchBar";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Icon } from "react-icons-kit";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { basic_heart } from "react-icons-kit/linea/basic_heart";
import { basic_home } from "react-icons-kit/linea/basic_home";
import { ecommerce_cart_content } from "react-icons-kit/linea/ecommerce_cart_content";
import { person } from "react-icons-kit/oct/person";
import { threeBars } from "react-icons-kit/oct/threeBars";
import OffCanvasProfile from "./OffCanvasProfile";
import { end } from "@cloudinary/url-gen/qualifiers/textAlignment";
import logo from "../assets/images/logo.png";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
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
        {/* <li>
          <button id="burger-menu-button">
            <Icon icon={threeBars} size={15} />
          </button>
        </li> */}
        <Link to={"/"}>
          <li>
            <img src={logo} alt="logo" style={{ width: "75px" }} />
          </li>
        </Link>

        <SearchBar />

        <Link to={"/wishlist"}>
          <li>
            <Icon icon={basic_heart} size={15} />
          </li>
        </Link>
        <Link to={"/cart"}>
          <li>
            <Icon icon={ecommerce_cart_content} size={15} />
          </li>
        </Link>

        <li>
          <OffCanvasProfile
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        </li>
      </nav>
    </div>
  );
}

export default Navbar;
