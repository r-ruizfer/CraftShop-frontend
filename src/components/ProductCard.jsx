import React from "react";

function ProductCard(props) {
  const { eachProduct } = props;
  return (
    <div key={eachProduct._id}>
      <div>
        <img src={eachProduct.image} alt="" />
      </div>
      <h2>{eachProduct.title}</h2>
      <p>{eachProduct.description}</p>
      <p>{eachProduct.price}</p>
    </div>
  );
}

export default ProductCard;
