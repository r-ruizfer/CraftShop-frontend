import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductList(props) {
  const { products } = props;
  console.log(products);

  return (
    <>
      <div id="product-grid">
        {products
          .sort((a, b) => b._id.localeCompare(a._id))
          .map((eachProduct) => {
            return (
              <Link key={eachProduct._id} to={`/${eachProduct._id}`}>
                <ProductCard eachProduct={eachProduct} />
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default ProductList;
