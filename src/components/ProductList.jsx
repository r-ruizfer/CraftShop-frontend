import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import SmallProductCard from "../components/SmallProductCard";

import { ProductsContext } from "../context/products.context.jsx";

function ProductList(props) {
  // const { products } = useContext(ProductsContext);

  if (props.type === "product list") {
    return (
      <>
        <>
          {props.products
            .sort((a, b) => b._id.localeCompare(a._id))
            .map((eachProduct) => {
              return <ProductCard eachProduct={eachProduct} />;
            })}
        </>
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
                <div key={eachProduct._id}>
                  {props.type === "cart" ? (
                    <SmallProductCard eachProduct={eachProduct} type="cart" />
                  ) : (
                    <SmallProductCard eachProduct={eachProduct} />
                  )}
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default ProductList;
