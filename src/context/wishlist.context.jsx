import React, { useState, useEffect, useContext, createContext } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";

//comparte la data de productos a traves de la app
const WishlistContext = createContext();

//wrapper que almacena la informacion

function WishlistWrapper({ children }) {
  const { user, isLoggedIn } = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [wishlist, setWishlist] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Add to wishlist
  const handleWishlist = async (productId) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (isWishlisted) {
          const response = await service.patch(
            `users/${user._id}/products/${productId}/removeWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
          setIsWishlisted(false);

          console.log("quitado de favoritos DESDE CONTEXT");
          console.log("wishlist CONTEXT");
        } else {
          const response = await service.patch(
            `users/${user._id}/products/${productId}/addWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
          setIsWishlisted(true);
          
          console.log("añadido a favoritos DESDE CONTEXT", wishlist);
        }
      } else {
        setErrorMessage("User ID no available");
        alert("Sorry, you need to log in to add items to wishlist.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        isWishlisted,
        setIsWishlisted,
        handleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export { WishlistContext, WishlistWrapper };
