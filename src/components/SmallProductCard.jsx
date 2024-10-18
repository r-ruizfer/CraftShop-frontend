import React from "react";

function SmallProductCard(props) {
  const { eachProduct } = props;
  console.log("cada producto", eachProduct);

  return (
    <div className="small-card">
      <div className="small-product-image" style={{ backgroundImage:`url (${eachProduct.image})` }} >
      <img src={eachProduct.image} alt="" />
      <button className="fav-button">❤</button>
      </div>
      <div className="small-card-info">
        <h2>{eachProduct.title}</h2>
        <p>{eachProduct.price} €</p>
        <button>Remove from cart</button>
      </div>
    </div>
  );
}

export default SmallProductCard;
