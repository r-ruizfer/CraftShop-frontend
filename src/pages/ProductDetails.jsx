import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  ProductsContext
} from "../context/products.context.jsx";

function ProductDetails() {
  const {productId} = useParams();
  console.log("params", productId);

  const { products } = useContext(ProductsContext);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/products/:productId`)
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   const product = products.find((eachProduct) => {
  //     return eachProduct._id === productId;
  //   });
  //   setCurrentProduct(product);
  // }, [products, productId]);

  console.log("products", products);
  console.log("currentProduct", currentProduct);

  return (
    <div>
      <div>
        <img src={currentProduct.image} alt="" />
      </div>
      <h2>{currentProduct.title}</h2>
      <p>{currentProduct.description}</p>
      <p>{currentProduct.price}</p>
    </div>
  );
}

export default ProductDetails;
