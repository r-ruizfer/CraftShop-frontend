import React from "react";

function SmallProductCard(props) {
  const { eachProduct, type } = props;
  console.log("cada producto", eachProduct);


  const handleAddToWishlist = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        const response = await service.patch(
          `users/${user._id}/products/${productId}/addWishlist`
        );

        setUserProfile(response.data);
        setWishlist((prevWishlist) => [
          ...prevWishlist,
          response.data.wishlistedItems,
        ]);
      } else {
        setErrorMessage("User ID no available");
      }
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  console.log("user", user);
  console.log("logged", isLoggedIn);




  return (
    <div className="small-card">
      <div className="small-product-image" style={{ backgroundImage:`url (${eachProduct.image})` }} >
      <img src={eachProduct.image} alt="" />
      <button className="fav-button">❤</button>
      </div>
      <div className="small-card-info">
        <h2>{eachProduct.title}</h2>
        <p>{eachProduct.price} €</p>

      {type=== "cart" ? (<button id="remove-item-btn">Remove from cart</button>) : ("")}
        
      </div>
    </div>
  );
}

export default SmallProductCard;
