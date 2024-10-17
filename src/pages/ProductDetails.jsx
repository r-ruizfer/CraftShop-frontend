import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/products.context.jsx";

function ProductDetails(props) {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [prodComments, setProdComments] = useState(null);
  const {productsInCart, setProductsInCart} = props;

  

  // const { products } = useContext(ProductsContext);

  //llamada para recibir el producto actual
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/${productId}`
        );
        setCurrentProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProduct();
  }, [productId]);

  if (!currentProduct) return <p>Product not found</p>;

//Add to cart 

const handleAddToCart= ()=> {
 setProductsInCart([currentProduct, ...productsInCart]);
 console.log("Añadido al carrito", productsInCart);
}
console.log("carrito", productsInCart)

  // /comments/products/:productId



  //CONSOLE LOGS
  // console.log("products", products);
  console.log("productID params", productId);
  console.log("current", currentProduct);

  return (
    <>
    <div id="product-detail-card">
      <div>
        <img src={currentProduct.image} alt={currentProduct.title} />
        <button id="fav-button">❤</button>
      </div>
      <div id="product-detail-info">
      <h1>{currentProduct.price} €</h1>
        <h2>{currentProduct.title}</h2>
        <p>{currentProduct.description}</p>
        <button onClick={handleAddToCart} id="add-cart-button">Add to cart</button>
      </div>
    </div>

    <div id="comments-list">
      <h3>Comments section</h3>
    </div>
    </>
  );
}

export default ProductDetails;
