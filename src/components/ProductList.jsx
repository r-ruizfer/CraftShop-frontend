import React from "react";
import ProductCard from "../components/ProductCard";
import SmallProductCard from "../components/SmallProductCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductList(props) {
  if (props.type === "product list") {
    return (
      <>
        <div id="product-grid">
          {props.products
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
  } else if (props.type === "wishlist" || props.type === "cart") {
    return (
      <>
        <div id="small-product-screen">
          {props.products
            .sort((a, b) => b._id.localeCompare(a._id))
            .map((eachProduct) => {
              return (
                <Link key={eachProduct._id} to={`/${eachProduct._id}`}>
                  {props.type === "cart" ? (<SmallProductCard eachProduct={eachProduct} type= "cart"/>) : (<SmallProductCard eachProduct={eachProduct} />)}
                  
                </Link>
              );
            })}
        </div>
      </>
    );
  }
}

export default ProductList;
