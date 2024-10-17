import React from "react";

function ProductCard(props) {
  const { eachProduct } = props;
  return (
    <div className="product-card" key={eachProduct._id}>
      <div>
        <img src={eachProduct.image} alt="" />
      </div>

      <div className="product-info">
        <h1 className="product-price">{eachProduct.price} €</h1>
        <h2>{eachProduct.title}</h2>
      </div>
    </div>
  );
}

export default ProductCard;
