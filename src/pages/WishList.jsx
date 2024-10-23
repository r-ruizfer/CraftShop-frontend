import service from "../services/config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import ProductList from "../components/ProductList";
import { Link, useNavigate } from "react-router-dom";
import NotLogin from "../components/NotLogin";
import { Spinner, Breadcrumb } from "react-bootstrap";

function WishList(props) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { wishlist, setWishlist } = props;
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goCart = () => {
    navigate("/cart");
  };
  const wlBreadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item onClick={goHome}>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
      <Breadcrumb.Item onClick={goCart}>Cart</Breadcrumb.Item>
    </Breadcrumb>
  );

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
              navigate("/error");
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
      <>
        {wlBreadcrumb}
        <NotLogin />
      </>
    );
  }
  if (loading)
    return (
      <>
        {wlBreadcrumb}

        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>...Loading Wishlist...</p>
      </>
    );

  if (!wishlist || wishlist.length === 0)
    return (
      <>
        {wlBreadcrumb}
        <div className="info-page">
          <p>No products yet in your wishlist</p>
          <Link to={"/"}>
            <button className="keep-looking-btn">Keep looking</button>
          </Link>
        </div>
      </>
    );

  return (
    <>
      {wlBreadcrumb}
      <div className="screen">
        <ProductList
          products={wishlist}
          setWishlist={setWishlist}
          type="wishlist"
        />
      </div>
    </>
  );
}

export default WishList;
