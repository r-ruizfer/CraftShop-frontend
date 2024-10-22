import React from "react";
import ProductCard from "../components/ProductCard";
import SmallProductCard from "../components/SmallProductCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../context/products.context.jsx";

function ProductList(props) {
  // const { products } = useContext(ProductsContext);
const {setWishlist}=props
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
                <div key={eachProduct._id}>
                  {props.type === "cart" ? (
                    <SmallProductCard
                      eachProduct={eachProduct}
                      wishlist={props.products}
                      setWishlist={setWishlist}
                      type="cart"
                    />
                  ) : (
                    <SmallProductCard
                      eachProduct={eachProduct}
                      wishlist={props.products}
                      setWishlist={setWishlist}
                    />
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
