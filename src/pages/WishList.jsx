import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import ProductList from "../components/ProductList";
import { Link, useNavigate } from "react-router-dom";
import NotLogin from "../components/NotLogin";
import { Spinner } from "react-bootstrap";

function WishList(props) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { wishlist, setWishlist } = props;
  const navigate= useNavigate()

  useEffect(() => {
    const getUser = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (user._id) {
          service
            .get(`/users/${user._id}`)
            .then((response) => {
              setUserProfile(response.data);
              setWishlist(response.data.wishlistedItems);
              setLoading(false);
            })
            .catch((err) => {
              const errorDescription = err.response.data.message;
              setErrorMessage(errorDescription);
              navigate("/error")
            });
        } else {
          setErrorMessage("User ID is not available.");
          setLoading(false);
        }
      }
    };
    getUser();
  }, [isLoggedIn, user]);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!userProfile) {
    return (
      <NotLogin/>
    );
  }
  if (loading) return (
    <>
      <Spinner animation="border" variant="dark"  className="homepage-spinner" />
      <p>...Loading Wishlist...</p>
    </>
  );

  if (!wishlist || wishlist.length === 0)
    return (
      <div className="info-page" >
        <p>No products yet in your wishlist</p>
        <Link to={"/"}>
          <button className="keep-looking-btn" >Keep looking</button>
        </Link>
      </div>
    );

  return (
    <div className="screen">
      <ProductList
        products={wishlist}
        setWishlist={setWishlist}
        type="wishlist"
      />
    </div>
  );
}

export default WishList;
